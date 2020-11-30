import { Component, HostListener, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { NavbarComponent } from 'ng-uikit-pro-standard';
import { CategoryService } from './../../services/category.service';
import { first } from 'rxjs/operators'
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService } from './../../services/cart.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  @ViewChild('nav', { static: true }) nav: NavbarComponent;

  public user: any;
  public categories: any;
  public my_categories: any;
  public subcategories: any;
  public collections: any = [];
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
    public el: ElementRef,
    public cs: CategoryService,
    public crts: CartService,
    public afa: AngularFireAuth,
    public router: Router,
    public afs: AngularFirestore
    ) {}
  

  ngOnInit() {

    this.afa.authState.subscribe(res=>{
      this.user = res;
      console.log(this.user, this.user.uid, this.user.email)
      this.crts.getCart(this.user.uid).then(ref=>{
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

    this.getCollections()

 
    this.cs.getCategories().then(resp=>{
      resp.valueChanges().subscribe(res=>{
        this.my_categories = res;
        console.log(res)
      })
    })
    // return this.collections
  }


  transformDropdowns() {
  // const dropdownMenu = Array.from(this.el.nativeElement.querySelectorAll('.dropdown-menu'));
  // const navHeight = this.nav.navbar.nativeElement.clientHeight + 'px';
  
  // dropdownMenu.forEach((dropdown) => {
  //   this.renderer.setStyle(dropdown, 'transform', `translateY(${navHeight})`);
  // });
  }
  
  @HostListener('click', ['$event'])
  onClick(event) {
  const toggler = this.el.nativeElement.querySelector('.navbar-toggler');
  const togglerIcon = this.el.nativeElement.querySelector('.navbar-toggler-icon');
  if (event.target === toggler || event.target === togglerIcon) {
    console.log('test');
    setTimeout(() => {
      this.transformDropdowns();
    }, 351);
  }
  }
  
  @HostListener('document:scroll', ['$event'])
  onScroll() {
  this.transformDropdowns();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.transformDropdowns();
  }
  
  ngAfterViewInit() {
  this.transformDropdowns();
  }

  

    async getCollections(){
   
      var collections: any = await []
      this.cs.getCategories().then(response=>{
       response.valueChanges().pipe().subscribe(async res=>{
         this.categories = await res;
         console.log(this.categories);
         for(let i = 0; i < this.categories.length; i++){
           await this.cs.getSubCategories(this.categories[i].id).valueChanges().pipe(first()).subscribe(async ref=>{
             this.subcategories = await ref;
             console.log(this.subcategories)
             await this.collections.push({"name": this.categories[i].name,
                 "id": this.categories[i].id, "subcategories": this.subcategories})
           })
         }
         console.log(collections, this.collections)
       })
     })
    }


    async register(email, password, cpassword){
      console.log(email, password, cpassword)
      if(email && password && password  === cpassword){
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
              first_name: '',
              last_name: '',
              address: '',
              zip_code: '',
              shipping_address: '',
              username: '',
              phone: 0,
            })
             await this.router.navigateByUrl('/checkout')
          }
        })
      }
      else {
        console.log('registration is not possible')
      }
    }
  
    async login(email, password, carts){
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
    }
  
    async logout(){
      await this.afa.signOut()
      await location.reload()
    }
  }
  
