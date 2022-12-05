import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore'

import { Mensaje } from '../interfaces/mensaje';
import { map } from 'rxjs/operators';
import { async } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  //declaracion de variables
  private collectionMensajes:AngularFirestoreCollection<Mensaje>

  //inyectamos en el constructor los servicios
  constructor(private db:AngularFirestore) {
    this.collectionMensajes = db.collection('mensajes')
  }

  //metodo para obtener mensajes
  getMensajes(){
    return this.collectionMensajes.snapshotChanges().pipe(map(action=>action.map(a=>a.payload.doc.data())))
  }


  //metodo para crear mensaje 
  createMensaje(nuevoMensaje:Mensaje){

    return new Promise(async (resolve,reject)=>{
      try{
        const id = this.db.createId();
        nuevoMensaje.idMensaje = id;
        const answer = await this.collectionMensajes.doc().set(nuevoMensaje);
        resolve(answer)
      }

      catch(error){
        reject(error)
      }
        
    })

  }
  
}


