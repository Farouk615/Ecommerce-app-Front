import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productsCategories!: ProductCategory[];
  currentId! : number;

  constructor(private productService:ProductService) // dependency injection 
  { }

  ngOnInit(): void { 
      this.listProductCategory()
  }
  listProductCategory() {
    this.productService.getProductsCategories().subscribe(
      data => {
        console.log("Product Categories"+JSON.stringify(data));
        this.productsCategories = data;
      }
    )

  }

}
