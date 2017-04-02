/**
 * Created by ben on 19.03.17.
 */

import { Injectable } from '@angular/core';
import {Product} from "./product";
import {Http, Response} from "@angular/http";
import {Body} from "@angular/http/src/body";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'


@Injectable()
export class ProductService {

    baseUrl : string = "http://127.0.0.1:5984/productinformation/";

    constructor(private http: Http) {}

    getProducts() : Observable<Product[]> {
        return this.http.get(this.baseUrl + "_design/products/_view/products")
            .map(response => ProductService.extractProducts(response));
    }

    getProduct(id: string) : Observable<Product> {
        return this
            .getProducts()
            .flatMap(products => Observable.from(products))
            .first(product => product._id === id);
    }

    addReview(product: Product) : Observable<Product> {
        return this.http.post(this.baseUrl, product)
            .map(response => response.json());
    }

    deleteProduct(itemId: string, rev: string): Observable<Response> {
        return this.http.delete(this.baseUrl + itemId + "?rev=" + rev);
    }

    private static extractProducts(body : Body) : Product[] {
        let products : Product[] = [];
        for (var row of body.json().rows) {
            products.push(row.value as Product)
        }

        return products;
    }
}
