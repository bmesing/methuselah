/**
 * Created by ben on 26.03.17.
 */

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";
import {Product} from "../../domain/product";

import {ButtonRadioDirective} from 'ng2-bootstrap';
import {NgForm} from "@angular/forms";
import { Subject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';


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

    public dataSource: Observable<any>;


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

        this.dataSource = Observable
            .create((observer: any) => {
                // Runs on every search
                observer.next(this.product.ean);
            })
            .do( value => console.log("ngOnInit.next: " + value))
            .mergeMap((token: string) => this.getEanAutocompletes(token));
    }

    getEanAutocompletes(term) : Observable<any> {
        console.log("getEanAutocompletes: " + term);

        //return term ? this.productService.searchEan(term) : Observable.of<Product[]>([])
        return this.productService.searchEan(term)
            .map(products => this.mapToTypeaheadItems(products))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<string[]>([]);
            })
            .switchMap(values => Observable.of(values)); 
    }


    onProductNameChanged(productName : string) : void {
        this.isProductFromDatabase = false;

    }

    onProductSelected(event : TypeaheadMatch) {

        console.log(event);
        this.product.name = event.value;

        TODO: continue here
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