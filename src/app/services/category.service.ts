import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    public afs: AngularFirestore
  ) { }

  async getCategories(){ 
    return this.afs.collection('categories')
  }

  getSubCategories(id){
    return this.afs.collection('subcategories', ref => ref.where('parent_id', '==', id))
  }

  getCategory(id){
    return this.afs.collection('categories').doc(id)
  }

  getSubCategory(id){
    return this.afs.collection('subcategories').doc(id)
  }

  getProducts(id){
    return this.afs.collection('fashion_products', ref=> ref.where('sub_category', '==', id))
  }

  getParticularSubCategories(id){
    console.log(id)
    return this.afs.collection('subcategories', ref => ref.where('parent_id', '==', id))
  }

  async getCategoriesAndLimt(limit){ 
    return this.afs.collection('categories' , ref=> ref.limit(limit))
  }

}