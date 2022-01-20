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
  previousCategoryId!:number;
  categoryName!:string;
  searchText!:string;

  // new proprieties for pagination 
  page:number = 1;
  size:number = 5;
  totalElements!:number;

  // new proprities for search pagination
  previousKeyword!:string;


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
    if(this.previousKeyword!=this.searchText){
      this.previousKeyword=this.searchText;
      this.page=1;
    }
    this.productService.searchProducts(this.searchText,this.page-1,this.size).subscribe(
      data => {
        this.products = data._embedded.products;
        this.page=data.page.number+1;
        this.size=data.page.size;
        this.totalElements=data.page.totalElements;
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
         /*this.page=data['page'];
         this.size=data['size'];*/
       });
      // console.log(this.currentCategoryId);
       //this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
     }
     else{
       // there is no id in the url we set the default at 1
 this.currentCategoryId=1;
 this.categoryName="Books";
 
     }
     if(this.currentCategoryId!=this.previousCategoryId){
       this.page=1;
       this.previousCategoryId=this.currentCategoryId;
       console.log(`category id :${this.categoryName} , the page is ${this.page}`);
     }
     this.productService.getProductsListPagination(this.currentCategoryId,this.page-1,this.size).subscribe(
       data => {
         
         this.products=data._embedded.products;
         this.page=data.page.number+1;
         this.totalElements=data.page.totalElements;
         this.size=data.page.size;
       }
     )
  }
  updatePageSize(pageSize:number){
    this.size=pageSize;
    this.page=1;
    this.listProducts();
  }

}
