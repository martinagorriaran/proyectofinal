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

  //declaracion de variables
  colUsuarios:Usuarios[] = []
  logueado = false

  //inyectamos los servicios en el constructor
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private login:LoginService,
    private servicioUsuarios:LoginService, 
    private google:LoginService
  ){}

  ngOnInit(): void {
    this.logueado = this.login.estaLogueado()
    this.google.getUser()

    /*
    this.servicioUsuarios.getUsuarios().subscribe(
      usuarios => this.colUsuarios = usuarios
    )*/
  }

  

  datosUsuarios = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  
  iniciaSesion(){
    this.servicioUsuarios.login(this.datosUsuarios,this.colUsuarios)
  }
  




  iniciarSesionConGoogle(){
    this.google.loginWithGoogle()
  }

 
}


