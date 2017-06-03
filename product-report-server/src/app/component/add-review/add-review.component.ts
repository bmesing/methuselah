/**
 * Created by ben on 26.03.17.
 */

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";
import {Product} from "../../domain/product";

import {ButtonRadioDirective} from 'ng2-bootstrap';
import {NgForm} from "@angular/forms";


@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html'
})
export class AddReviewComponent implements OnInit {

    newProduct : Product;
    manufacturerName : string;
    isProductFromDatabase  = true;


    constructor(
        private productService: ProductService,
        private router: Router,
    ) {
        this.newProduct = new Product();
        this.newProduct.name = "newName";
        this.newProduct.ean = "234324";

    }

    ngOnInit() : void {
    }


    onProductNameChanged(productName : string) : void {
        this.isProductFromDatabase = false;

    }

    onSubmit() : void {
        this.productService.addProduct(this.newProduct, this.manufacturerName).subscribe(
            response => this.onProductAdded(response),
            error => console.error("Add failed:" + error)
        );

/*        this.productService.addReview(this.newProduct).subscribe(
            response => console.log("Add success"),
            error => console.error("Add failed:" + error)
        )
        */
    }

    onProductAdded(product : Product) : void {
        console.log("Add success: " + product._id);
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.newProduct); }
}