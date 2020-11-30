import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public afs: AngularFirestore
  ) { }

  async getProduct(id){
    return this.afs.collection('fashion_products').doc(id)
  }

  async getProductsByGender(){
    return this.afs.collection('fashion_products', ref=>ref.limit(9))
  }

  async getAllProducts(){
    return this.afs.collection('fashion_products', ref=> ref.where('availability', '==', 'true'))
  }

  async getFeaturedProducts(){
    return this.afs.collection('fashion_products', ref=> ref.where('availability', '==', 'true').where('best_selling', '==', true).limit(9))
  }

  async getAllProductsInAcategory(id){
    return this.afs.collection('fashion_products' , ref=> ref.where('parent_category_id', '==', id))
  }
}
