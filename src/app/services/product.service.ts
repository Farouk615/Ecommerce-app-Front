import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root' // can be injected everywhere
})
export class ProductService {
 
  private baseUrl = 'http://localhost:8070/api/products';
  constructor(private httpClient:HttpClient) { }
  getProductsList(theCategoryId:number): Observable<Product[]>{
    console.log(theCategoryId)
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response=> response._embedded.products));
  }

  private baseCategoryUrl='http://localhost:8070/api/product_category'
  getProductsCategories():Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.baseCategoryUrl).pipe(map(respone=> respone._embedded.productCategory));
  }
}


interface GetResponseProduct{
  _embedded:{
    products:Product[];
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}