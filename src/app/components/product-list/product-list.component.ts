import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId!: number;

  constructor(private productService:ProductService,
              private route: ActivatedRoute){} // Dependency injection of service 
              
  ngOnInit(): void { // when the component load.. this method is being called
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    })} ;

 
  listProducts() {

      // check if parameter id is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has("id");
    if(hasCategoryId){
      // get the id from url + convert it to number 
      this.route.params.subscribe(data =>{
        this.currentCategoryId=+data['id'];
      });
     // console.log(this.currentCategoryId);
      //this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      // there is no id in the url we set the default at 1
this.currentCategoryId=1;
    }
    this.productService.getProductsList(this.currentCategoryId).subscribe(
      data => {
        console.log("hello drom "+JSON.stringify(data));
        this.products=data;
      }
    )
  }

}
