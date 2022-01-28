import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[]=[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();
  

  constructor() { }

  addToCart(theCartItem:CartItem){
    // check if we have already the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem:CartItem |undefined;

    if(this.cartItems.length>0){
      // find the item in the cart based on his id 
     existingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id===theCartItem.id); // returns first element that fit the condition else returns undefined 
      // check if we found it 
      alreadyExistsInCart = (existingCartItem!=undefined);
    }
    if(alreadyExistsInCart &&existingCartItem!=undefined){
      existingCartItem.quantity++;  
    }
    else
    this.cartItems.push(theCartItem);
    // compute total price and total quantity
    this.computeCartTotals();
  }
  decrementFromCart(theCartItem:CartItem){
    let existingCartItem:CartItem |undefined;
    existingCartItem=this.cartItems.find(tempCartItem => tempCartItem.id===theCartItem.id);
    if(existingCartItem!=undefined && existingCartItem.quantity>1 ){
      existingCartItem.quantity--;
    }  
    else
    this.removeFromCart(theCartItem);
    this.computeCartTotals();
  }
  removeFromCart(theCartItem:CartItem){
    var index = this.cartItems.indexOf(theCartItem)
    if (index > -1) {
      this.cartItems.splice(index, 1);
   }
    this.computeCartTotals();
  }
  computeCartTotals() {
    let totalPriceValue:number=0;
    let totalQuantityValue:number=0;
    for(let currentCartItem of this.cartItems){
     totalPriceValue+=currentCartItem.unitPrice*currentCartItem.quantity;
     totalQuantityValue+=currentCartItem.quantity;
    }
    // publish the new values .... all subs will recieve it 
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    console.log(` total price : ${totalPriceValue} and total quantity : ${totalQuantityValue}`)
  }
}

