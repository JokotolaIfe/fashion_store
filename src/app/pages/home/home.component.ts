import { WebsiteService } from './../../services/website.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public front_page_image_lg: any;
  public front_page_image_md: any;

  constructor(
    public ws: WebsiteService
  ) { }

  ngOnInit() {
    this.ws.getWebsite('front_page_image_lg').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        console.log(res)
        this.front_page_image_lg = res;
      })
    })

    this.ws.getWebsite('front_page_image_md').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        console.log(res)
        this.front_page_image_md = res;
      })
    })
  }

}
