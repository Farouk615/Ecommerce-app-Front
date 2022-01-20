import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
product:Product = new Product();
id!:number;
  constructor(private route:ActivatedRoute, private service:ProductService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.productDetails();
      
    })
  }
  productDetails() {
    this.route.params.subscribe(data =>{
      this.id=data['id'];
    })
    
    console.log("is there an id ? "+this.id);
    this.service.getProductDet(this.id).subscribe(
      data => {
        this.product = data
        console.log("my product is "+JSON.stringify(data))
      }
    )
  }

}
