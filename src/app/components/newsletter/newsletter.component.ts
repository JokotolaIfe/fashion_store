import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

  public email: string;
  public thankYou: boolean = false;

  constructor(
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
  }

  async subscribe(email){
      const id = await this.afs.createId()
      await this.afs.collection('subscriptions').doc(id).set({
          email: email,
          date: new Date().getTime()
      }).then(()=>{
        this.email = ''
        this.thankYou = true;
      })
  }

}
