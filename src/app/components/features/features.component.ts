import { WebsiteService } from './../../services/website.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  public families: any;
  Count = [];
  
  constructor(
    public router: Router,
    public ws: WebsiteService
  ) {
    this.Count.length = 10; 
    this.ws.getCoutreFamily().then(resp=>{
      resp.valueChanges().subscribe(res=>{
        this.families = res;
        console.log(this.families)
      })
    })
   }

  ngOnInit() {
    // this.ws.getWebsite().then(ref=>{
    //   ref.valueChanges().subscribe(res=>{
    //     console.log(res)
    //   })
    // })
    // this.ws.getWebsite().then(res=>{
    //   res.doc()
    // })

  }

}
