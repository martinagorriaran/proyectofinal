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
  form: FormGroup;
  loading = false;

  colUsuarios:Usuarios[] = []

  datosUsuarios = new FormGroup(
    {
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    }
  )
  
  constructor( private servicioUsuarios:LoginService ) { }

  ngOnInit(): void {
  }

  
  iniciaSesion(){
    this.servicioUsuarios.login(this.datosUsuarios,this.colUsuarios)
  }

}
