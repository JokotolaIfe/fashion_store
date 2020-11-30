import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fashion';
  user;
  person;
  constructor(public afa: AngularFireAuth){
  
  }

  ngOnInit() {
    this.afa.signInAnonymously().then(res=>{
      this.user = res.user
      console.log(this.user) 
    })
  }
  
}
    