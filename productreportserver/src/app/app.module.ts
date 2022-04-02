import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from "./component/product-detail/product-detail.component";
import { ProductListComponent } from "./component/product-list/productlist.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { ProductService } from "./domain/product.service";
import { AppRoutingModule } from "./app-routing.module";
import { AddReviewComponent } from "./component/add-review/add-review.component";
 
import { NgbModule } from"@ng-bootstrap/ng-bootstrap";
//import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
    declarations: [
        AppComponent,
        AddReviewComponent,
        DashboardComponent,
        ProductDetailComponent,
        ProductListComponent
//        FileSelectDirective
    ],
    imports: [
        NgbModule,
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule

    ],
    providers: [ProductService],
    bootstrap: [AppComponent]
})


export class AppModule {

}

