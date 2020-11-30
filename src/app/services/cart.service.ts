import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    public afs: AngularFirestore
  ) { }

  async addToCart(uid, product, selected_size, qty){
      const cid = await this.afs.createId();
      this.afs.collection('carts').doc(cid).set({
        id: cid,
        product: product,
        size: selected_size,
        date: new Date().getTime(),
        quantity: qty,
        userId: uid,
        color: 'none'
      })
  }

  async getCart(uid){
    return this.afs.collection('carts', ref=> ref.where('userId', '==', uid))
  }

  async deleteCart(id){
    this.afs.collection('carts').doc(id).delete()
  }

  updateCart(id, quantity){
    this.afs.collection('carts').doc(id).update({
      quantity: quantity
    })
  }

  async checkOut(first_name, last_name, phone, email, zip_code, country, state, address1, address2, carts, ref, uid, totalPrice, totalQuanity){
    const id = await this.afs.createId()
    await this.afs.collection('orders').doc(id).set({
      first_name, last_name, phone, email, zip_code, country, state, address1, address2, carts, ref, userId: uid,  totalPrice: totalPrice, totalQuanity: totalQuanity,
      status: 'pending', date: new Date().getTime(), id: id
    })
  }


  async clearCarts(uid){
    this.getCart(uid).then(resp=>{
      resp.get()
      .subscribe((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }
  
        // Delete documents in a batch
        let batch = this.afs.firestore.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
  
        return batch.commit().then(() => {
          return snapshot.size;
        });
      })
    })
  }
}
