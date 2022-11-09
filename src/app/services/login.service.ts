import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoged = false

  private coleccionUsuarios: AngularFirestoreCollection<Usuarios>

  cookieValue: string;

  constructor(private db:AngularFirestore, private router: Router, private cookieService: CookieService) { 
    this.coleccionUsuarios = this.db.collection("usuarios");
    
    this.cookieService.set('Test','Hello Word');
    this.cookieValue= this.cookieService.get('Test');
  }

  getUsuarios(){
    return this.coleccionUsuarios.snapshotChanges().pipe(
        map(action=>action.map(a=>a.payload.doc.data()))
      )
  }

  login(form:FormGroup,usuariosCol:Usuarios[]){
    let texto = "No Inició"
    if(form.valid){
      usuariosCol.forEach(
        usuario=>{
          if(form.value.username === usuario.username){
            if(form.value.password === usuario.password){
              this.isLoged = true
              texto = "Inició Sesión"
              this.router.navigateByUrl('admin')
            }
          }
        }
      )
      alert(texto)
    }
  }

  //metodo que se llama cuando esta logueado el usuario
  estaLogueado(){
    return this.isLoged
  }

 
  
}
