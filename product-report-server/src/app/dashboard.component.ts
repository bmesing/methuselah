/**
 * Created by ben on 19.03.17.
 */


import {Component, OnInit} from '@angular/core';
import {Product} from "./domain/product";
import {ProductService} from "./domain/product.service";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) {
    }

    ngOnInit() : void {
        this.productService.getProducts()
            .then(products => this.products = products.slice(1, 3));
    }
}