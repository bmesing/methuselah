/**
 * Created by ben on 26.03.17.
 */

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";
import {Product} from "../../domain/product";

import { Subject } from "rxjs";
import { Observable } from "rxjs";
import { from, tap } from "rxjs";

import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { map, catchError, mergeAll } from 'rxjs/operators';

export class ProductTypeAhead {
    constructor(
        private displayName: string,
        private product: Product,
    ) {

    }
}

@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html'
})
export class AddReviewComponent implements OnInit {

    product : Product;
    manufacturerName : string;
    isProductFromDatabase  = true;

    eanSearchTerms = new Subject<string>();

    dataSource =  (eanInput$: Observable<string>) => 
    eanInput$
    .pipe(
        tap( ean => console.log("ngOnInit.next: " + ean)),
        map( ean => this.getEanAutocompletes(ean) ),
        mergeAll()
    )

    search = (text$: Observable<string>) =>
    text$.pipe(
      map(term => [])
    );

    autoCompleteProducts: string[] = [];

    constructor(
        private productService: ProductService,
        private router: Router,
    ) {
        this.product = new Product();
        this.product.name = "newName";
        this.product.ean = "234324";
    }
    
    mapToTypeaheadItems(products : Product[]) : ProductTypeAhead[] {
        console.log("mapToProductNames");
        let productNames : ProductTypeAhead[] = [];
        for (var product of products) {
            productNames.push(new ProductTypeAhead(product.name + " (" + product.ean + ")", product));
        }        
        return productNames;
    }

    ngOnInit() : void {
        /*
        this.eanSearchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(
                term => term ? this.productService.searchEan(term) : Observable.of<Product[]>([])
            )
            .map(products => this.mapToProductNames(products))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<string[]>([]);
            })
            .subscribe(productNames => {
                console.log(productNames[0]);
                this.autoCompleteProducts = productNames;
            });
            */

    }

    getEanAutocompletes(term : string) : Observable<ProductTypeAhead[]> {
        console.log("getEanAutocompletes: " + term);

        return this.productService.searchEan(term)
            .pipe(
                map(products => this.mapToTypeaheadItems(products)),
                catchError(error => {
                    // TODO: add real error handling
                    console.log(error);
                    return from<ProductTypeAhead[][]>([]);
                })
            )
    }


    onProductNameChanged(productName : string) : void {
        this.isProductFromDatabase = false;

    }

    onProductSelected(event : NgbTypeaheadSelectItemEvent<string>) {

        console.log(event);
        this.product.name = event.item;

    //    TODO: continue here
    }

    onSubmit() : void {
        this.productService.addProduct(this.product, this.manufacturerName).subscribe(
            response => this.onProductAdded(response),
            error => console.error("Add failed:" + error)
        );

/*        this.productService.addReview(this.product).subscribe(
            response => console.log("Add success"),
            error => console.error("Add failed:" + error)
        )
        */
    }

    onProductAdded(product : Product) : void {
        console.log("Add success: " + product._id);
    }

    searchEan(term: string): void {
        this.eanSearchTerms.next(term)
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.product); }
}