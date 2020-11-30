import { Component, OnInit } from '@angular/core';
import { WebsiteService } from './../../services/website.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  public privacy: any;

  constructor(
    public ws: WebsiteService
  ) { }

  ngOnInit() {
    this.ws.getWebsite('privacy').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        this.privacy = res;
        console.log(this.privacy)
      })
    })
  }

}
