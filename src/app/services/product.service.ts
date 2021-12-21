import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

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
    return this.httpClient.get<GetResponse>(searchUrl).pipe(map(response=> response._embedded.products));
  }
}

interface GetResponse{
  _embedded:{
    products:Product[];
  }
}