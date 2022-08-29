import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Mensaje } from 'src/app/interfaces/mensaje';
import { MensajeService } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-comp4',
  templateUrl: './comp4.component.html',
  styleUrls: ['./comp4.component.scss']
})
export class Comp4Component implements OnInit {

  

  constructor(private servicioMensajes:MensajeService) { }

  nuevoMensaje = new FormGroup({
    nombre:new FormControl('',Validators.required),
    apellido:new FormControl('',Validators.required),
    mensaje:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    telefono:new FormControl('',Validators.required),
  })

  
  agregarMensaje(){
    if(this.nuevoMensaje.valid){
      let nuevoMensaje:Mensaje = {

        nombre : this.nuevoMensaje.value.nombre!,
        apellido : this.nuevoMensaje.value.apellido!,
        email : this.nuevoMensaje.value.email!,
        mensaje : this.nuevoMensaje.value.mensaje!,
        telefono : this.nuevoMensaje.value.telefono!,
        idMensaje : ""
        
      }
  
      this.servicioMensajes.createMensaje(nuevoMensaje).then(mensaje=>{
        alert("Mensaje enviado con exito")
      })
  
      .catch(error=>{
        alert("Ocurrio un error\nError: "+error)
      })
    }

   

    
  }
  

  ngOnInit(): void {
  }

}
