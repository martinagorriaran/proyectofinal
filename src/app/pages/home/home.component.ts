import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menus:Menu[] = []


  constructor(private servicioMenus: MenuService) {

  }

  ngOnInit(): void {
    this.servicioMenus.getMenu().subscribe((menu)=>{
      this.menus = menu
    })
  }

}
