/**
 * Created by ben on 19.03.17.
 */

import {Component, Input, OnInit} from '@angular/core'
import {ActivatedRoute, Params} from "@angular/router";
import { Location }                 from '@angular/common';
import {Product} from "./domain/product";
import {ProductService} from "./domain/product.service";

import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']

})

export class ProductComponent implements OnInit {
    @Input()
    product: Product;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.route.params.switchMap((params: Params) =>
                this.productService.getProduct(params['id'])
        ).subscribe(product => {
            console.log('onNext: %s', product._id);
            this.product = product
        },
            e => console.log('onError: %s', e),
            () => console.log('onCompleted')
        )
    }

    goBack(): void {
        this.location.back();
    }



}
