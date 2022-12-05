
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

  //inyecto los servicios en el constructor
  constructor(private servicioMensajes:MensajeService) { }

  //metodo que guarda los datos del formulario
  nuevoMensaje = new FormGroup({
    //validators requierd define que todos los campos son obligatorios
    nombre:new FormControl('',Validators.required),
    apellido:new FormControl('',Validators.required),
    mensaje:new FormControl('',Validators.required),
    email:new FormControl('',Validators.required),
    telefono:new FormControl('',Validators.required),
  })

  //metodo para enviar mensaje
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
      
      //si servicio mensajes crea un nuevo mensaje
      this.servicioMensajes.createMensaje(nuevoMensaje).then(mensaje=>{
        //y envia una alerta
        alert("Mensaje enviado con exito")
      })
      //si ocurre un error no crea un nuevo mensaje
      .catch(error=>{
        //y envia una alerta
        alert("Ocurrio un error\nError: "+error)
      })
    }
  }
  
  ngOnInit(): void {
  }

}
