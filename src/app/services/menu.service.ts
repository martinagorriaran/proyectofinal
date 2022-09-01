import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Menu } from '../interfaces/menu';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private collectionMenu:AngularFirestoreCollection<Menu>

  constructor(private db:AngularFirestore) {
    this.collectionMenu = db.collection('menu')
  }

  getMenu(){
    return this.collectionMenu.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }
}
