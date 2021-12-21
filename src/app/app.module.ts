import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';

// define your routes 
const routes:Routes = [
  {path: 'category/:id', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
  {path: '', redirectTo : "/products" , pathMatch : "full"},
  {path: '**', redirectTo : "/products" , pathMatch : "full"}  // wildCard : ay haja okhra bekhlef yemchi lel products
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService], // to be injected 
  bootstrap: [AppComponent],
  
})
export class AppModule { }
