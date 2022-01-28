import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!:FormGroup;
  totalQuantity:number=0;
  totalPrice:number=0;

  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
        firstName:[''],
        lastName:[''],
        email:[''],
      }),
      shipping:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      billing:this.formBuilder.group({
        country:[''],
        street:[''],
        city:[''],
        state:[''],
        zipCode:[''],
      }),
      creditCard:this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        zipCode:[''],
        expirationMonth:[''],
        expirationYear:[''],
      }),

    })
  }
  purchase(){
    console.log("i am the sexiest man in the world");
    console.log(this.checkoutFormGroup.get("customer")?.value);
  }
  copyShippingToBilling(event: any){
    // if(event.target.checked){
    //   //this.checkoutFormGroup.controls.billing.setValue(this.checkoutFormGroup.controls.shipping.value)
    // }
    // else {
    //   this.checkoutFormGroup.controls.billing.reset();
    // }

  }
}
