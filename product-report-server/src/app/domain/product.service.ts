/**
 * Created by ben on 19.03.17.
 */

import { Injectable } from '@angular/core';
import {Product, Attachment} from "./product";
import {Http, Response} from "@angular/http";
import {Body} from "@angular/http/src/body";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx'


@Injectable()
export class ProductService {


    private static databaseName : string = "productinformation";
    private static baseUrl : string = "http://127.0.0.1:5984/" + ProductService.databaseName + "/";

    constructor(private http: Http) {}

    getProducts() : Observable<Product[]> {
        return this.http.get(ProductService.baseUrl + "_design/products/_view/products")
            .map(response => ProductService.extractProducts(response));
    }

    search(searchTerm: string) : Observable<Product[]> {
        console.log("searching for " + searchTerm);
        return this.http.get(ProductService.baseUrl + "_design/products/_view/search_by_phrase?startkey=\"" + searchTerm + "\"&endkey=\"" + searchTerm + "\uffff\"")
            .map(response => ProductService.extractProducts(response));
    }


    getProduct(id: string) : Observable<Product> {
        return this
            .getProducts()
            .flatMap(products => Observable.from(products))
            .first(product => product._id === id);
    }

    addReview(product: Product) : Observable<Product> {
        return this.http.post(ProductService.baseUrl, product)
            .map(response => response.json());
    }


    getAttachmentUrl(product: Product) : string{
        return ProductService.baseUrl + product._id + "/" + Math.ceil(Math.random() * 100000000)  + "?rev=" + product._rev;
    }

    deleteProduct(itemId: string, rev: string): Observable<Response> {
        return this.http.delete(ProductService.baseUrl + itemId + "?rev=" + rev);
    }


    private static getAttachments(product : Product) : Attachment[]  {
        var result : Attachment[] = [];
        for (var attachment in product._attachments) {
            console.log(product._attachments[attachment]);
            result.push(product._attachments[attachment] as Attachment)
            result[result.length - 1].fileName = ProductService.baseUrl + product._id + "/" + attachment;
        }
        return result;

    }

    private static extractProducts(body : Body) : Product[] {
        console.log("Response: " + body);
        let products : Product[] = [];
        for (var row of body.json().rows) {
            products.push(row.value as Product)
            products[products.length - 1].attachments = this.getAttachments(row.value as Product);
        }

        return products;
    }
}
