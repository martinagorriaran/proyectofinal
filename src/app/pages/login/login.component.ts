import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  
  constructor( private fb: FormBuilder,  private router: Router ) { }

  ngOnInit(): void {
  }

  ingresar(){
    console.log(this.form);
    const username = this.form.value.username;
    const password = this.form.value.password;

    if(username == 'gmartina' && password == 'admin123' ){
      //Redireccionamos a dashboard
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

      //Redireccionamos al dashboard
      this.router.navigate(['home'])
    },1500)
  }

}
