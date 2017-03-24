/**
 * Created by ben on 22.03.17.
 */

import {NgModule} from '@angular/core';

import {ProductComponent} from "./product.component";
import {ProductListComponent} from "./productlist.component";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductListComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'product-detail/:id',
        component: ProductComponent
    },
];


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}