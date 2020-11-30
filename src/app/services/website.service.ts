import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(
    public afs: AngularFirestore
  ) { }

  async getWebsite(id){
    return this.afs.collection('website').doc(id)
  }

  async getCoutreFamily(){
    return this.afs.collection('coutre_family')
  }
}
