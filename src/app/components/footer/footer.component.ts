import { CategoryService } from './../../services/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public categories: any;
  
  constructor(
    public cs: CategoryService
  ) { }

  ngOnInit() {
    this.cs.getCategoriesAndLimt(4).then(ref=>{
      ref.valueChanges().subscribe(res=>{
        this.categories = res;
        console.log(this.categories)
      })
    })
  }

}
