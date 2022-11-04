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

  menuSeleccionado:Menu;

  menus: Menu[]

  imagen:string;

  modalVisible:boolean=false;

  textoBoton:string;

  eliminarVisible:boolean = true

  constructor(private servicioMenus:MenuService,private servicioStorage:StorageService) { }

  ngOnInit(): void {

    this.servicioMenus.getMenu().subscribe(menu=>{
      this.menus = menu
    })
  }

  nombreImagen:string

  nuevoMenu = new FormGroup({
    comida: new FormControl('',Validators.required),
    img: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
  })

  async agregarMenu(){
    if(this.nuevoMenu.valid){
      let nuevoMenu:Menu = {
        comida: this.nuevoMenu.value.comida!,
        descripcion: this.nuevoMenu.value.descripcion!,
        img: "",
        idMenu: "",
        }
      
        this.servicioStorage.subirImagen(this.nombreImagen,this.imagen)
        .then(
          async res=>{
            this.servicioStorage.obtenerUrlImagen(res).
            then(
              async url=>{
                await this.servicioMenus.createMenu(nuevoMenu,url)
                .then(menu=>{
                  alert("Menu agregado con exito")
                })
                .catch(error=>{
                  alert("Ocurrió un error\nError: "+error)
                })
              }
            )
          }
        )

    }
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

  cargarMenu(){
    if(this.textoBoton === "Agregar Menu"){
      this.agregarMenu()
    }
    else if(this.textoBoton === "Editar Menu"){
      this.actualizarMenu()
    }
    this.nuevoMenu.reset()
    this.modalVisible = false
  }

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
