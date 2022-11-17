import { Injectable, Input } from '@angular/core';
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

  createMenu(nuevoMenu:Menu,url:string){
    return new Promise(async (resolve,reject)=>{
      try{
        const id = this.db.createId();
        nuevoMenu.idMenu = id;
        nuevoMenu.img = url
        const respuesta = await this.collectionMenu.doc(id).set(nuevoMenu);
        resolve(respuesta) 
        }
        catch(error){
          reject(error)
        }
    })
  }

  editarMenu(idMenu:string,nuevosDatos:Menu){
    return this.collectionMenu.doc(idMenu).update(nuevosDatos)
  }

  deleteMenu(idMenu:string){
    return new Promise((resolve,reject)=>{
      try{
        const respuesta = this.collectionMenu.doc(idMenu).delete()
        resolve(respuesta)
      }
      catch(error){
        reject(error)
      }
    })  
  }

}
  

