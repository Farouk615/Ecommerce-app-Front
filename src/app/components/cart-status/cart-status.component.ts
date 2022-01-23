import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

   totalPrice:number =0;
   totalItems:number =0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }
  updateCartStatus() {
    // subscribe to the cart total price
    this.cartService.totalPrice.subscribe(
      data=> this.totalPrice=data
    );
    // subscribe to the cart total items quantity 
    this.cartService.totalQuantity.subscribe(
      data=> this.totalItems=data
    );
  }

}
