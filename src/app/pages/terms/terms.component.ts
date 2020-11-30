import { Component, OnInit } from '@angular/core';
import { WebsiteService } from './../../services/website.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  public terms: any;

  constructor(
    public ws: WebsiteService
  ) { }

  ngOnInit() {
    this.ws.getWebsite('term').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        this.terms = res;
        console.log(this.terms)
      })
    })
  }
}
