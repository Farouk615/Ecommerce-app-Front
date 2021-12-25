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
  categoryName!:string;
  searchText!:string;


  constructor(private productService:ProductService,
              private route: ActivatedRoute){} // Dependency injection of service 
              
  ngOnInit(): void { // when the component load.. this method is being called
    this.route.paramMap.subscribe(()=>{
      this.listProducts();

    })} ;

    
  listProducts() {
    const search = this.route.snapshot.paramMap.has("keyword");
    if(search){
      this.handleSearchProducts();
    }
    else{
      this.handleListProducts();
     }
  }
  handleSearchProducts() {
    this.route.params.subscribe(data =>{
      this.searchText=data['keyword'];
    })
    this.productService.searchProducts(this.searchText).subscribe(
      data => {
        this.products = data
      }
    )
  }

  handleListProducts(){
     // check if parameter id is available
     const hasCategoryId : boolean = this.route.snapshot.paramMap.has("id");
     if(hasCategoryId){
       // get the id from url + convert it to number 
       this.route.params.subscribe(data =>{
         this.currentCategoryId=+data['id'];
         this.categoryName=data['name'];
       });
      // console.log(this.currentCategoryId);
       //this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
     }
     else{
       // there is no id in the url we set the default at 1
 this.currentCategoryId=1;
 this.categoryName="Books";
     }
     this.productService.getProductsList(this.currentCategoryId).subscribe(
       data => {
         console.log("hello drom "+JSON.stringify(data));
         this.products=data;
       }
     )
  }

}
