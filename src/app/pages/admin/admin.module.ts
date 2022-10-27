import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { MenuComponent } from './menu/menu.component';
import { InfomacionComponent } from './infomacion/infomacion.component';
import { BannerfycComponent } from './bannerfyc/bannerfyc.component';
import { BannerinfComponent } from './bannerinf/bannerinf.component';
import { SolicitarinfComponent } from './solicitarinf/solicitarinf.component';



@NgModule({
  declarations: [
    BannerComponent,
    MenuComponent,
    InfomacionComponent,
    BannerfycComponent,
    BannerinfComponent,
    SolicitarinfComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MenuComponent
  ]
})
export class AdminModule { }
