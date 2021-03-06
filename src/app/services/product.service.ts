import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root' // can be injected everywhere
})
export class ProductService {
 
  searchProducts(searchText: string, page:number , size:number) {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${searchText}&page=${page}&size=${size}`
return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
 
  private baseUrl = 'http://localhost:8070/api/products';
  constructor(private httpClient:HttpClient) { }

  getProductsListPagination(theCategoryId:number , thisPage:number , thisPageSize:number): Observable<GetResponseProduct>{
    console.log(theCategoryId)
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}&page=${thisPage}&size=${thisPageSize}`;
    console.log(searchUrl);
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

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
  getProductDet(id: number):Observable<Product> {
    const urlDetail = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(urlDetail);
    
  }
}


interface GetResponseProduct{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number,
  }
}
interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}