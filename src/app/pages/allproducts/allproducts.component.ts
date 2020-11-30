import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.scss']
})
export class AllproductsComponent implements OnInit {

  public products: any;

  constructor(
    public ps: ProductService
  ) { }

  ngOnInit() {
    this.ps.getAllProducts().then(ref=>{
      ref.valueChanges().subscribe(res=>{
        console.log(res)
        this.products = res;
      })
    })
  }

}
