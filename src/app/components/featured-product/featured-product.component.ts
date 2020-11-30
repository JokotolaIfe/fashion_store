import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent implements OnInit {
  cards 


  constructor(
    public ps: ProductService
  ){

  }
  slides: any = [[]];
  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.ps.getFeaturedProducts().then(ref=>{
      ref.valueChanges().subscribe(res=>{
        console.log(res)
        this.cards = res;
        this.slides = this.chunk(this.cards, 3);
      })
    })
  }
}
