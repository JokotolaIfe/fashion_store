import { CategoryService } from './../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categoryproducts',
  templateUrl: './categoryproducts.component.html',
  styleUrls: ['./categoryproducts.component.scss']
})
export class CategoryproductsComponent implements OnInit {

  public products: any;
  public category: any;
  
  constructor(
    public route: ActivatedRoute,
    public ps: ProductService,
    public cs: CategoryService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async params=>{
      const id = await params['id'];
      console.log(params['id'], id)
      this.ps.getAllProductsInAcategory(id).then(ref=>{
        ref.valueChanges().subscribe(res=>{
          this.products= res;
          console.log(res)
        })
      })
      this.cs.getCategory(id).valueChanges().subscribe(res=>{
        this.category = res;
      })
    })
  }

}
