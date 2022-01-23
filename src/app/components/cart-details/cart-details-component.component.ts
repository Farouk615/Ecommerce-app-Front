import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details-component',
  templateUrl: './cart-details-component.component.html',
  styleUrls: ['./cart-details-component.component.css']
})
export class CartDetailsComponent implements OnInit {
  orderedProducts!:CartItem[];
  totalItems:number=0;
  totalPrice:number=0;
  shipping:string="Free";

  constructor(private cartService:CartService) {
  
   }

  ngOnInit(): void {
    this.getAllItems();
  }
  getAllItems() {
    // get the items 
   this.orderedProducts=this.cartService.cartItems;
   // subscribe to total Price
   this.cartService.totalPrice.subscribe(
     data=> this.totalPrice=data
   );
   // subscribe to total Quantity
   this.cartService.totalQuantity.subscribe(
    data=> this.totalItems=data
  );
  // compute cart total Price and quantity 
  this.cartService.computeCartTotals();
  }
  addQuantity(product:CartItem){
   this.cartService.addToCart(product);
  }
  decrementQuantity(product:CartItem){
    this.cartService.decrementFromCart(product);
  }
removeItem(cartItem:CartItem){
  this.cartService.removeFromCart(cartItem);
}
}
