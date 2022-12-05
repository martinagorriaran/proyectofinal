import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-comp3',
  templateUrl: './comp3.component.html',
  styleUrls: ['./comp3.component.scss']
})
export class Comp3Component implements OnInit {

  //enviamos propiedades desde el componente padre al hijo con el input
  @Input() entrada:Menu[]

  //inyectamos dentro del constructor los servicios
  constructor(private servicioMenus:MenuService) { }

  ngOnInit(): void {
  }

}
