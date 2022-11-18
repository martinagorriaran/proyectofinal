import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { async } from '@firebase/util';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuarios } from '../interfaces/usuarios';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //declaracion de variables
  private isLoged = false
  private coleccionUsuarios: AngularFirestoreCollection<Usuarios>
  cookieValue: string;
  
  constructor(private db:AngularFirestore, private router: Router, private cookie: CookieService, private auth:AngularFireAuth) { 
  }
 
  async loginWithGoogle(){
    let referenceProvider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(referenceProvider);
    this.auth.authState.subscribe(
      async user=>{
        await user?.getIdToken()
        .then(
          token=>{
            this.cookie.set("idToken",token)
            this.router.navigateByUrl('/admin')
          }
        )
        .catch(
          error=>{
            console.error("Ocurrió un error: ",error)
          }
        )
      }
    )
  }

  getUser(){
    this.auth.authState.subscribe(
      async user=>{
        let token = await user?.getIdToken()
        console.log(token)
      }
    )
  }

  logOut(){
    this.auth.signOut().then(
      ()=>{
        this.cookie.delete("idToken");
      }
    )
  }




  //metodo para obtener usuarios
  getUsuarios(){
    return this.coleccionUsuarios.snapshotChanges().pipe(
        map(action=>action.map(a=>a.payload.doc.data()))
      )
  }

  //metodo para iniciar sesion
  login(form:FormGroup,usuariosCol:Usuarios[]){
    let texto = "No Inició"
    //si el formulario es valido
    if(form.valid){
      //comparo cada contraseña y nombreusuario
      usuariosCol.forEach(
        usuario=>{
          if(form.value.username === usuario.username){
            if(form.value.password === usuario.password){
              //si el iniciar sesion es verdadero  
              this.isLoged = true
              texto = "Inició Sesión"
              //redirijo al usuario a la pagina del admin
              this.router.navigateByUrl('admin')
            }
          }
        }
      )
      //envio un aviso de si el inicio de sesion fue exitoso o no
      alert(texto)
    }
  }

  //metodo que se llama cuando esta logueado el usuario
  estaLogueado(){
    return this.isLoged
  }
  
}
