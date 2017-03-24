import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductComponent } from "./product.component";
import {ProductListComponent} from "./productlist.component";
import {DashboardComponent} from "./dashboard.component";
import {ProductService} from "./domain/product.service";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        ProductComponent,
        ProductListComponent
    ],
    imports: [
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

