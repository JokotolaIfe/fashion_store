import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { CartService } from './../../services/cart.service';

import { first } from 'rxjs/operators'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public category: any;
  public products: any;
  public subcategories: any;
  public product: any;
  public selected_size: string;
  public checkModel: any = { left: true, middle: false, right: false };
  public radioModel: string = 'Left';
  public user: any;
  public quantity: number

  constructor(
    public route:ActivatedRoute,
    public ps: ProductService,
    public afa: AngularFireAuth,
    public cs: CartService,
    public router: Router,
    private location: Location
    ){}

    ngOnInit() {
      this.route.params.subscribe(params=>{
        const id = params['id'];
        console.log(params['id'])
        this.ps.getProduct(id).then(ref=>{
          ref.valueChanges().subscribe(res=>{
            console.log(res);
            this.product = res;
          })
        })
      })

      this.afa.authState.subscribe(resp=>{
        console.log(resp, resp.email, resp.uid)
        this.user = resp;
        if(this.user.email){
            console.log('Welcome', this.user.email)
        }
        else {
          this.afa.signInAnonymously().then(res=>{
            this.user = res.user
            console.log(this.user) 
          })
        }
      })

      // this.afa.authState.subscribe(res=>{
      //   this.user = res;
      //   console.log(this.user.uid)
      // })

     this.ps.getProductsByGender().then(ref=>{
       ref.valueChanges().subscribe(res=>{
         console.log(res)
         this.products = res;
        this.slides = this.chunk(this.products, 3);
       })
     })

    }

    addToCart(uid, product, selected_size, qty){
      if(uid && product && selected_size && qty) {
        console.log(uid, product, selected_size, qty)
        this.cs.addToCart(uid, product, selected_size, qty).then(res=>{
          console.log(res)
          this.router.navigateByUrl('/cart')
        })
      }
     else if(!selected_size){
       alert('Please select a size before you proceed')
     }
     else if(!qty){
       alert('Please enter the quantity of product you desire before you proceed')
     }
    }

    getSize(size){
      console.log(size)
      this.selected_size = size;
    }

    goBack() {
      this.location.back(); // <-- go back to previous location on cancel
    }

  slides: any = [[]];
  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
