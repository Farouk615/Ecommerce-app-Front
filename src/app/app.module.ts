import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details-component.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';


// define your routes 
const routes:Routes = [
  {path:'checkout', component:CheckoutComponent},
  {path:'products/:id', component:ProductDetailsComponent},
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'category/:id/:name', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
  {path: 'cart-details', component:CartDetailsComponent},
  {path: '', redirectTo : "/products" , pathMatch : "full"},
  {path: '**', redirectTo : "/products" , pathMatch : "full"}  // wildCard : ay haja okhra bekhlef yemchi lel products
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [ProductService], // to be injected 
  bootstrap: [AppComponent],
  
})
export class AppModule { }
