/**
 * Created by ben on 19.03.17.
 */

import { Injectable } from '@angular/core';
import {Product} from "./product";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {Body} from "@angular/http/src/body";

@Injectable()
export class ProductService {

    constructor(private http: Http) {}

    getProducts() : Promise<Product[]> {
        return this.http.get("http://127.0.0.1:5984/productinformation/_design/products/_view/products")
                    .toPromise()
                    .then(response => this.extractProducts(response))
                    .catch(this.handleError);
    }

    getProduct(id: string) : Promise<Product> {
        return this.getProducts()
            .then(products => products
                .find(
                    product => product._id === id
                )
            );

    }

    private extractProducts(body : Body) : Product[] {
        console.log(body);
        console.log(body.json());
        let products : Product[] = [];
        for (var row of body.json().rows) {
            console.log(row);
            products.push(row.value as Product)
        }

        return products;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
