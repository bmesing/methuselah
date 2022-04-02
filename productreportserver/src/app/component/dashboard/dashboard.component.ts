/**
 * Created by ben on 19.03.17.
 */


import {Component, OnInit} from '@angular/core';
import {Product} from "../../domain/product";
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";

import { from, Subject, Observable } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

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
        this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(
                term => term ? this.productService.search(term) : from<Product[][]>([])
            ),
            catchError(error => {
                // TODO: add real error handling
                console.log(error);
                return from<Product[][]>([]);
            })
        ).subscribe((products: Product[]) => this.products = products);
    }

    navigateToAddReview() : void {
        this.router.navigate(["add-review"])
    }


    search(term: string): void {
        this.searchTerms.next(term)
    }

}