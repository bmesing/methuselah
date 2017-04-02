/**
 * Created by ben on 22.03.17.
 */

import {NgModule} from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {ProductComponent} from "./component/product-detail/product.component";
import {ProductListComponent} from "./component/product-list/productlist.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AddReviewComponent} from "./component/add-review/add-review.component";


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'products', component: ProductListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product-detail/:id', component: ProductComponent },
    { path: 'add-review', component: AddReviewComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}