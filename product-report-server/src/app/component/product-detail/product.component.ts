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
    selector: 'product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css'],
})

export class ProductComponent implements OnInit {
    product: Product;

    uploader: FileUploader;

    imageUploadUrl: string;

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
            this.imageUploadUrl = this.productService.getAttachmentUrl(product);
            // TODO error handling if accessed later, but no uploader was initialized
            this.uploader = new FileUploader({url: this.imageUploadUrl, queueLimit : 1, method: "PUT", disableMultipart:true, itemAlias : "_attachments", additionalParameter : {"_rev" : product._rev}});
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
        this.uploader.onSuccessItem = function(item:any, response:any, status:any, headers:any): any
        {
            return console.log("Upload Success");
        };

        this.uploader.onErrorItem = function(item:any, response:any, status:any, headers:any): any
        {
            return console.log("Upload error");
        };
        this.uploader.uploadAll();
    }
}
