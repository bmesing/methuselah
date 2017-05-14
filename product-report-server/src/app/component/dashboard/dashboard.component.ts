/**
 * Created by ben on 19.03.17.
 */


import {Component, OnInit} from '@angular/core';
import {Product} from "../../domain/product";
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    products: Product[] = [];

    private searchTerms = new Subject<string>();    


    constructor(
        private productService: ProductService,
        private router: Router    ) {
    }

    ngOnInit() : void {
        this.searchTerms
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(
                term => term ? this.productService.search(term) : Observable.of<Product[]>([])
            )
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Product[]>([]);
            })
            .subscribe(products => this.products = products);
    }

    navigateToAddReview() : void {
        this.router.navigate(["add-review"])
    }


    search(term: string): void {
        this.searchTerms.next(term)
    }

}