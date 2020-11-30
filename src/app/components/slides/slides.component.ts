import { WebsiteService } from './../../services/website.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  public website_featured_image: any;

  constructor(
    public ws: WebsiteService
  ) { }

  ngOnInit() {
    this.ws.getWebsite('website_featured_image').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        this.website_featured_image = res;
        console.log(this.website_featured_image)
      })
    })
  }

}
