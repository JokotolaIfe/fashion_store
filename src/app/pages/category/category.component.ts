import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public category: any;
  public products: any;
  public subcategories: any;
  public categories: any;
  public date: number = new Date().getTime()
  constructor(
    public route:ActivatedRoute,
    public cs: CategoryService
    ){}

    ngOnInit() {
      this.route.params.subscribe(async params=>{
        const id = await params['id'];
        console.log(params['id'])
        await this.cs.getSubCategory(id).valueChanges().subscribe(async res=>{
          this.category = await res;
          console.log(this.category, this.category.parent_id, this.category.name)
          this.cs.getParticularSubCategories(this.category.parent_id).valueChanges().subscribe(async resp=>{
            console.log(resp, resp[0]);
            this.subcategories = await resp;
            console.log(this.subcategories, this.category.id)
            this.categories =  await this.subcategories.filter(function(hero) {
              return hero.id != id;
            });
            console.log(this.categories)
            
            
          })
        })
        this.cs.getProducts(id).valueChanges().subscribe(ref=>{
          this.products = ref;
          console.log(this.products)
        })
      })
      // this.cs.getCategories()
    }

}
