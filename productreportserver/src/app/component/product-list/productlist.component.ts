/**
 * Created by ben on 19.03.17.
 */

import {Component, OnInit} from "@angular/core";
import {ProductService} from "../../domain/product.service";
import {Product} from "../../domain/product";
import {Router} from "@angular/router";


@Component({
    selector: 'products',
    templateUrl: './productlist.component.html',
})

export class ProductListComponent implements OnInit {
    products: Product[];
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
        this.productService.getProducts().subscribe(products => this.products = products);
    }

    toggleDeleteMode() : void {
        this.deleteModeActive = !this.deleteModeActive;
    }

    deleteProduct(product: Product) {
        this.productService.deleteProduct(product._id, product._rev)
            .subscribe(
                response => this.onDeleteProductCompleted(product._id),
                error => console.error("Delete failed")
            );
    }

    onDeleteProductCompleted(id : string) : void {
        console.log("Delete success");
        let index = this.products.findIndex(product => product._id === id);
        if (index > -1) {
            this.products.splice(index, 1);
        }
    }
}