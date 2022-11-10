import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() entrada:Menu[]

  /*declaracion de variables*/
  menuSeleccionado:Menu;
  menus: Menu[]
  imagen:string;
  modalVisible:boolean=false;
  textoBoton:string;
  eliminarVisible:boolean = true
  nombreImagen:string

  /*inyecto en el constructor los servicios*/
  constructor(private servicioMenus:MenuService,private servicioStorage:StorageService) { }

  ngOnInit(): void {
    this.servicioMenus.getMenu().subscribe(menu=>{
      this.menus = menu
    })
  }

  nuevoMenu = new FormGroup({
    comida: new FormControl('',Validators.required),
    img: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
  })


  /*metodo para añadir un nuevo menu*/
  async agregarMenu(){

    /*si nuevo menu es valido */
    if(this.nuevoMenu.valid){

      /*guardar datos menu */
      let nuevoMenu:Menu = {
        comida: this.nuevoMenu.value.comida!,
        descripcion: this.nuevoMenu.value.descripcion!,
        img: "",
        idMenu: "",
      }
      
      /*usamos el metodo subir imagen y servicio storage para enviar sus parametros*/
      this.servicioStorage.subirImagen(this.nombreImagen,this.imagen)
      .then(
        async res=>{
          /*luego obtemos la url de la imagen del servicio storage*/
          this.servicioStorage.obtenerUrlImagen(res).
          then(
            async url=>{
              /*espero a que se cree el nuevo menu*/
              await this.servicioMenus.createMenu(nuevoMenu,url)
              .then(menu=>{
                /*aviso el si menu fue agragado con exito*/
                alert("Menu agregado con exito")
              })
              .catch(error=>{
                /*aviso si ocurrio un error*/
                alert("Ocurrió un error\nError: "+error)
              })
            }
          )
        }
      )

    }

    /*si no aviso que hay campos vacios*/
    else{
    alert("Hay campos vacíos")
    }
  }

  actualizarMenu(){
    let nuevoMenu:Menu = {
      comida: this.nuevoMenu.value.comida!,
      descripcion: this.nuevoMenu.value.descripcion!,
      img: "",
      idMenu: this.menuSeleccionado.idMenu,
    }

    this.servicioMenus.editarMenu(this.menuSeleccionado.idMenu,nuevoMenu)
    .then((resp)=>{
      alert("Menu actualizado con éxito")
    })
    .catch((error)=>{
      alert("No se pudo actualizar el menu\nError: "+error)
    })
    
  }

  mostrarEliminar(menu:Menu){
    this.eliminarVisible = false
    this.menuSeleccionado = menu
  }

  eliminarMenu(){
    this.servicioMenus.deleteMenu(this.menuSeleccionado.idMenu)
    .then((resp)=>{
      this.servicioStorage.eliminarImagen(this.menuSeleccionado.img)
      alert("El menu fue elimnado con éxito")
    })
    .catch((err)=>{
      alert("No se pudo eliminar el menu\nError: "+err)
    })
    this.eliminarVisible = false
  }
  /*metodo mostrar editar*/
  mostrarEditar(menuSeleccionado:Menu){
    this.menuSeleccionado = menuSeleccionado
    this.imagen = this.menuSeleccionado.img
    this.nuevoMenu.setValue({
      comida: menuSeleccionado.comida,
      descripcion: menuSeleccionado.descripcion,
      img: menuSeleccionado.descripcion
    })

    this.textoBoton = "Editar Producto"
    this.modalVisible = true
  }

  mostrarDialogo(){
    this.imagen = ""
    this.textoBoton = "Agregar Menu"
    this.modalVisible=true;
  }

  /*metodo cargar menu*/
  cargarMenu(){
    /*si el texto boton es agregar menu usamos el metodo correspondiente*/
    if(this.textoBoton === "Agregar Menu"){
      this.agregarMenu()
    }
    /*si el texto boton es editar menu usamos el metodo correspondiente*/
    else if(this.textoBoton === "Editar Menu"){
      this.actualizarMenu()
    }
    this.nuevoMenu.reset()
    this.modalVisible = false
  }
  
  /*metodo cargar imagen*/
  cargarImagen(event:any){
    let archivo = event.target.files[0];
    let reader = new FileReader();
    if(archivo!=undefined){
        reader.readAsDataURL(archivo)
        reader.onloadend = () => {
         let url = reader.result
          if(url!=null){
            this.nombreImagen = archivo.name
            this.imagen = url.toString()
          }
        }
      }
   }

   


}
