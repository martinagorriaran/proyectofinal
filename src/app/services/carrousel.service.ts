import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { map } from 'rxjs/operators';
import { Carrousel } from '../interfaces/carrousel';

@Injectable({
  providedIn: 'root'
})
export class CarrouselService {

  //declaracion de variables
  private collectionCarrousels:AngularFirestoreCollection<Carrousel>;

  constructor(private db:AngularFirestore) { 
    this.collectionCarrousels = db.collection('carrousels');
  }

  getCarrousels(){
    return this.collectionCarrousels.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }
}
