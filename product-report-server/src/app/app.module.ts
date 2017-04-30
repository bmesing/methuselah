import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductComponent } from "./component/product-detail/product.component";
import { ProductListComponent } from "./component/product-list/productlist.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { ProductService } from "./domain/product.service";
import { AppRoutingModule } from "./app-routing.module";
import { AddReviewComponent } from "./component/add-review/add-review.component";
import { ButtonsModule } from "ng2-bootstrap";
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';


@NgModule({
    declarations: [
        AppComponent,
        AddReviewComponent,
        DashboardComponent,
        ProductComponent,
        ProductListComponent,
        FileSelectDirective
    ],
    imports: [
        ButtonsModule.forRoot(),
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule

    ],
    providers: [ProductService],
    bootstrap: [AppComponent]
})


export class AppModule {

}

