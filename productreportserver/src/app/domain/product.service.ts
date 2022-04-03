/**
 * Created by ben on 19.03.17.
 */

import { Injectable } from '@angular/core';
import {CouchResponse} from "./couchresponse";
import {CouchSearchResponse} from "./couchsearchresponse";
import {Manufacturer} from "./manufacturer";
import {Product, Attachment} from "./product";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import { map, mergeAll } from 'rxjs/operators';

@Injectable()
export class ProductService {
    private static databaseName : string = "products";
    private static baseUrl : string = "http://127.0.0.1:5984/" + ProductService.databaseName + "/";

    constructor(private http: HttpClient) {}

    getProducts() : Observable<Product[]> {
        return this.http.get<Product[]>(ProductService.baseUrl + "products")
    }

    getProduct(id: string) : Observable<Product | undefined> {
        return this
            .getProducts()
            .pipe(
                map(products => products.find(product => product._id === id))
            );
    }

    searchManufacturer(searchTerm: string) : Observable<Manufacturer[]> {
        console.log("searching for " + searchTerm);
        return this.http.get<Manufacturer[]>(ProductService.baseUrl + "_design/products/_view/manufacturers?startkey=\"" 
                                            + searchTerm.toLowerCase() + "\"&endkey=\"" + searchTerm.toUpperCase() + "\uffff\"")
    }


    search(searchTerm: string) : Observable<Product[]> {
        console.log("searching for " + searchTerm);
        return this.http.get<Product[]>(ProductService.baseUrl + "_design/products/_view/search_by_phrase?startkey=\"" 
                                        + searchTerm.toLowerCase() + "\"&endkey=\"" + searchTerm.toUpperCase() + "\uffff\"")
    }

    searchEan(eanSearchString: string) : Observable<Product[]> {
        console.log("searchEan: searching for " + eanSearchString);
        return this.http.get<Product[]>(ProductService.baseUrl + "_design/products/_view/products_by_ean?startkey=\"" 
                                    + eanSearchString.toLowerCase() + "\"&endkey=\"" + eanSearchString.toUpperCase() + "\uffff\"")
    }


    addReview(product: Product) : Observable<Product> {
        return this.http.post<Product>(ProductService.baseUrl, product)
    }

    hasManufacturer(name : string) : Observable<boolean> {
        return this.http.get<CouchSearchResponse>(ProductService.baseUrl + "_design/products/_view/manufacturer?key=\"" + name.toLowerCase() + "\"").pipe(
            map(couchSearchResponse => couchSearchResponse.totalRows > 0)
        )
    }

    getAttachmentUrl(product: Product) : string{
        return ProductService.baseUrl + product._id + "/" + Math.ceil(Math.random() * 100000000)  + "?rev=" + product._rev;
    }   

    deleteProduct(itemId: string, rev: string): Observable<HttpResponse<Object>> {
        return this.http.delete(ProductService.baseUrl + itemId + "?rev=" + rev,  { observe: 'response' });
    }

    addProduct(newProduct: Product, manufacturerName: string) : Observable<Product> {
        return this.http
            .post<Manufacturer>(ProductService.baseUrl, ProductService.createManufacturerForName(manufacturerName))
            .pipe(
                map(manufacturer => {
                    newProduct.manufacturerId = manufacturer._id;
                    return this.http.post<Product>(ProductService.baseUrl, newProduct)
                }),
                mergeAll()

            )
    }

    private static createManufacturerForName(name: string) : Manufacturer {
        var result = new Manufacturer;
        result.name = name;
        return result;
    }


    private static getAttachments(product : Product) : Attachment[]  {
        var result : Attachment[] = [];
        for (var attachment in product._attachments) {
            //console.log(product._attachments[attachment]);
            //result.push(product._attachments[attachment] as Attachment)
            result[result.length - 1].fileName = ProductService.baseUrl + product._id + "/" + attachment;
        }
        return result;

    }
    /*

    private static extractProducts(body : Body) : Product[] {
        console.log("extractProducts: Response: " + body);
        let products : Product[] = [];
        for (var row of body.json().rows) {
            products.push(row.value as Product)
            products[products.length - 1].attachments = this.getAttachments(row.value as Product);
        }

        return products;
    }

    private static extractManufacturers(body : Body) : Manufacturer[] {
        console.log("Response: " + body);
        let manufacturers : Manufacturer[] = [];
        for (var row of body.json().rows) {
            manufacturers.push(row.value as Manufacturer)
        }
        return manufacturers;
    }
*/
}
