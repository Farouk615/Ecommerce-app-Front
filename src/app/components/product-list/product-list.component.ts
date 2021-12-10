import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
//  templateUrl: './product-list.component.html',
//  templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService:ProductService) // Dependency injection of service 
  { 
   

  }

  ngOnInit(): void { // when the component load.. this method is being called
    this.listProducts();
  }

  listProducts() {
    this.productService.getProductsList().subscribe(
      data => {
        this.products=data;
      }
    )
  }

}
