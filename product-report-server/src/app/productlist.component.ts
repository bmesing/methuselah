/**
 * Created by ben on 19.03.17.
 */

import {Component, OnInit} from "@angular/core";
import {ProductService} from "./domain/product.service";
import {Product} from "./domain/product";
import {Router} from "@angular/router";


@Component({
    selector: 'products',
    templateUrl: './productlist.component.html',
})

export class ProductListComponent implements OnInit {
    products;
    selectedProduct: Product;
    deleteModeActive: boolean;

    constructor(
        private router: Router,
        private productService: ProductService) {
        this.deleteModeActive = false;
    }

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.productService.getProducts().then(products => this.products = products);
    }

    toggleDeleteMode() : void {
        this.deleteModeActive = !this.deleteModeActive;
    }
}