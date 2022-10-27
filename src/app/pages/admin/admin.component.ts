import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  menus:Menu[] = []

  constructor(private servicioMenus: MenuService) { }

  ngOnInit(): void {
    this.servicioMenus.getMenu().subscribe((menu)=>{
      this.menus = menu
    })
  }

}
