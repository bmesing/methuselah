/**
 * Created by ben on 26.03.17.
 */

import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../domain/product.service";
import {Router} from "@angular/router";
import {Product} from "../../domain/product";

import {ButtonRadioDirective} from 'ng2-bootstrap';


@Component({
    selector: 'add-review',
    templateUrl: './add-review.component.html'
})
export class AddReviewComponent implements OnInit {

    newProduct : Product;

    constructor(
        private productService: ProductService,
        private router: Router    ) {
        this.newProduct = new Product();
        this.newProduct.name = "newName";
        this.newProduct.ean = "234324";

    }

    ngOnInit() : void {
    }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.newProduct); }
}