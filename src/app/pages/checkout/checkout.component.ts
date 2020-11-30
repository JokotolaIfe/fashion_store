import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { PaystackOptions } from 'angular4-paystack';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService } from './../../services/cart.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  user: any;
  currentUser: any;
  public carts: any;
  public totalAmount: number;
 total : number = 0;
  items : any  ;
  public person: any;
  public newCustomer: any;
  public hidebutton: boolean =true;
  public sumAll: any;
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public sum: number = 0;
  public productItem: any;
  public my_button: boolean = true;
  public first_name: string;
  public last_name: string;
  public zip_code: string;
  public country: string;
  public username: string;
  public phone: string;
  public email: string;
  public address: string;
  public state: string;
  public address1: string;
  public address2: string = ' ';
  public reference: string;
  public title: string;
  public option: any;
  public options : PaystackOptions = {
    amount: 0,
    email: '',
    ref: '54454555'
  };
 
  constructor(
    public cs: CartService,
    public afa: AngularFireAuth,
    private location: Location,
    public router: Router,
    public us: UserService
    ) { }

  
  optionsSelectCountry = [
    { value: 'Nigeria', label: 'Nigera' },
  ];

  optionsSelectState = [
    { value: 'Osun', label: 'Osun' },
    { value: 'Lagos', label: 'Lagos' },
    { value: 'Oyo', label: 'Oyo' },
    { value: 'Abuja', label: 'Abuja' },
    { value: 'Kaduna', label: 'Kaduna' },
    { value: 'Ondo', label: 'Ondo' },
    { value: 'Ekiti', label: 'Ekiti' },
  ];

  optionsSelectPeriod = [
    { value: '1', label: '+6 months: 200$' },
    { value: '2', label: '+12 months: 400$' },
    { value: '3', label: '+18 months: 800$' },
    { value: '4', label: '+24 months: 1200$' },
  ];

  ngOnInit() {
    this.afa.authState.subscribe(res=>{
      this.user = res;
      console.log(this.user)
      this.cs.getCart(this.user.uid).then(ref=>{
        ref.valueChanges().subscribe(resp=>{
          this.carts = resp;
          console.log(this.carts)
        this.totalQuantity = 0;

        this.carts.forEach((item: any) => {
          this.productItem = item

        // Get the total qty of a product added 
          this.totalQuantity += Number(this.productItem.quantity);

         // Get the total price of all products in carts i.e Product price x quantity
          this.total += Number(this.productItem.product.product_price * this.productItem.quantity)
         
                this.options  = {
                  amount: this.total,
                  email: this.user.email,
                  ref: `${Math.ceil(Math.random() * 10e10)}`
                }

          })
        })
      })
      this.us.getUser(this.user.uid).then(ref=>{
        ref.valueChanges().subscribe(resp=>{
          this.currentUser = resp;
          console.log(this.currentUser)
        })
      })
    })
    this.reference = `ref-${Math.ceil(Math.random() * 10e13)}`;
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  getEmail(email,total){
    console.log(email, this.email, total)
    this.email = email
    this.reference = `${Math.ceil(Math.random() * 10e10)}`
    this.options  = {
      amount: total*100,
      email: this.email,
      ref: this.reference,
    }
  }

  // paymentDone(ref: any) {
    
  // }

  async paymentDone($event, first_name, last_name, phone, email, zip_code, country, state, address1, address2, carts, ref, uid, totalPrice, totalQuanity){
    this.title = 'Payment successfull';
    console.log(this.title, event, $event, first_name, last_name, phone, email, zip_code, country, state, address1, address2, carts, ref, uid);
    await this.us.getUser(uid).then(ref=>{
      ref.update({
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        zip_code: zip_code,
        country: country,
        state: state,
        address: address1,
        shipping_address: address2,
        modified: new Date().getTime()
      })
    })
    await this.cs.checkOut(first_name, last_name, phone, email, zip_code, country, state, address1, address2, carts, ref, uid, totalPrice, totalQuanity).then(async ref=>{
      await this.cs.clearCarts(uid);
    }).then((resp)=>{
      console.log(resp)
      alert('Payment Successful, Product will be deliver to you shortly')
      this.router.navigateByUrl('/')
    })
  }

  paymentCancel() {
    console.log('payment failed');
  }


}
