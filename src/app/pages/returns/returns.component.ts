import { Component, OnInit } from '@angular/core';
import { WebsiteService } from './../../services/website.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.scss']
})
export class ReturnsComponent implements OnInit {

  public returns: any;

  constructor(
    public ws: WebsiteService
  ) { }

  ngOnInit() {
    this.ws.getWebsite('return').then(ref=>{
      ref.valueChanges().subscribe(res=>{
        this.returns = res;
        console.log(this.returns)
      })
    })
  }
}