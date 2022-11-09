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

  

  datosUsuarios = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  // loading = false;

  colUsuarios:Usuarios[] = []

  constructor( private fb: FormBuilder, private router: Router, private servicioUsuarios:LoginService ) {
  }

  ngOnInit(): void {
    this.servicioUsuarios.getUsuarios().subscribe(
      usuarios => this.colUsuarios = usuarios
    )
  }

  iniciaSesion(){
    this.servicioUsuarios.login(this.datosUsuarios,this.colUsuarios)
  }

  

  

  
 

}
