import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService } from './../../services/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import * as  firebase from 'firebase';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('frame', {static: true}) frame: ModalDirective;
  @ViewChild('error', {static: true}) error: ModalDirective;

  public user: any;
  public carts: any;
  public totalAmount: number;
  public total : number = 0;
  public items : any  ;
  public person: any;
  public newCustomer: any;
  public hidebutton: boolean =true;
  public sumAll: any;
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public sum: number = 0;
  public productItem: any;
  public my_button: boolean = true;
  public email: string;
  public password: string;
  public cpassword: string;

  constructor(
    public cs: CartService,
    public afa: AngularFireAuth,
    private location: Location,
    public router: Router,
    public afs: AngularFirestore
  ) { }

  ngOnInit():void {
    this.afa.authState.subscribe(res=>{
      this.user = res;
      console.log(this.user, this.user.uid, this.user.email)
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
         

              })
        })
      })
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  async removeCart(id, uid){
    await this.cs.deleteCart(id)
    await this.reloadPage()
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
}

  changePrice(id, quantity){
    console.log(id, quantity)
    if(quantity > 0){
      this.cs.updateCart(id, quantity)
    }
    else {
    }
    if(quantity == undefined || quantity == 0 || quantity == null){
      this.my_button = false
    }
  }

  checkOut(){
    this.afa.authState.subscribe(res=>{
      this.user = res;
      console.log(res)
      if(this.user.email){
        this.router.navigateByUrl('/checkout')
      }
      else {
        this.frame.show()
      }
    })
  }

  async register(email, password, cpassword){
    console.log(email, password, cpassword)
    if(email && password && password  === cpassword){
      try {
        console.log('Registration is possible')
        console.log('login is possible')
        const credential = await firebase.auth.EmailAuthProvider.credential(email, password)
        await firebase.auth().currentUser.linkWithCredential(credential).then(async (res)=>{
          console.log(res)
          if(await res.user){
            await this.afs.collection('users').doc(res.user.uid).set({
              userId: res.user.uid,
              email: res.user.email,
              date: new Date().getTime(),
              first_name: 'First name',
              last_name: 'Last name',
              address: 'Address',
              zip_code: 'Zip Code',
              shipping_address: 'Shipping Address',
              username: 'username',
              phone: 0,
            })
             await this.router.navigateByUrl('/checkout')
          }
        })
      } catch (error) {
        alert(error.message)
      }
    }
    else {
      alert('Password does not match')
      console.log('registration is not possible')
    }
  }

  async login(email, password, carts){
    try {
      await this.afa.signInWithEmailAndPassword(email, password).then(res=>{
        res.user.uid
          for(let i = 0; i < carts.length; i++){
            this.afs.collection('carts').doc(carts[i].id).update({
              userId: res.user.uid,
              email: res.user.email
            })
          }
        }).then(()=>{
          this.router.navigateByUrl('/checkout')
        })
    } catch (error) {
      console.log(error)
      alert(error.message)
    }
  }


}
