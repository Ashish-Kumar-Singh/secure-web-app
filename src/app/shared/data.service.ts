import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private angularFireStore: AngularFirestore) { }

  public addReview(review: Review): any{
    review.id = this.angularFireStore.createId();
    return this.angularFireStore.collection('/Reviews').add(review);
  }

  public getAllReviews(): any{
    return this.angularFireStore.collection('/Reviews').snapshotChanges();
  }
  public deleteReview(review: Review): any{
    return this.angularFireStore.doc('/Reviews/' + review.id).delete();
  }

  public updateReview(review:any): any{
    this.deleteReview(review);
    this.addReview(review);
  }

}
