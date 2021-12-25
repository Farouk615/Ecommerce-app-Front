import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http'
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';

// define your routes 
const routes:Routes = [
  {path: 'search/:keyword', component:ProductListComponent},
  {path: 'category/:id/:name', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
  {path: '', redirectTo : "/products" , pathMatch : "full"},
  {path: '**', redirectTo : "/products" , pathMatch : "full"}  // wildCard : ay haja okhra bekhlef yemchi lel products
]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
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
