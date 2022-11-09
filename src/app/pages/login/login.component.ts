import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Usuarios } from 'src/app/interfaces/usuarios';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  

  form = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  loading = false;


  constructor( private fb: FormBuilder, private router: Router ) {
  }

  ngOnInit(): void {
  }

  

  ingresar(){
    console.log(this.form);
    const username = this.form.value.username;
    const password = this.form.value.password;

    if(username == 'gmartina' && password == 'admin123' ){
      //Redireccionamos a dashboard
      alert('Usuario o contraseña ingresado son validos');
      this.fakeLoading();
      
    }else{
      //Redireccionamos un mensaje de error
      this.error();
      this.form.reset();
    }
  }

 
  error(){
    alert('Usuario o contraseña ingresado son invalidos')
      
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(()=>{
      //Redireccionamos al admin
      this.router.navigateByUrl('admin')
    },1500)
  }

  

  

  
 

}
