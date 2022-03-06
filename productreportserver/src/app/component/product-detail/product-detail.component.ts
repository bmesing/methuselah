/**
 * Created by ben on 19.03.17.
 */

import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from "@angular/router";
import { Location }                 from '@angular/common';
import { Product } from "../../domain/product";
import { ProductService } from "../../domain/product.service";
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';


import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css'],
})

export class ProductDetailComponent implements OnInit {
    product: Product;

    uploader: FileUploader;


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
                // TODO error handling if accessed later, but no uploader was initialized
                this.uploader = new FileUploader({url: this.productService.getAttachmentUrl(product), method: "PUT", disableMultipart:true});
            },
            e => console.log('onError: %s', e),
            () => console.log('onCompleted')
        )
    }

    goBack(): void {
        this.location.back();
    }

    uploadImage(): void {
        console.log("Uploading image");

        // remove all entries except the last one
        while (this.uploader.queue.length > 1) {
            this.uploader.queue[0].remove();
        }
        this.uploader.setOptions({url : this.productService.getAttachmentUrl(this.product)});
        var component = this;
        this.uploader.onSuccessItem = function(item:any, response:any, status:any, headers:any): any
        {
            component.product._rev = JSON.parse(response).rev;
            return console.log("Upload Success");
        };

        this.uploader.onErrorItem = function(item:any, response:any, status:any, headers:any): any
        {
            return console.log("Upload error");
        };
        this.uploader.uploadAll();
    }
}
