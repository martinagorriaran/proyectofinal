import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu/menu.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ],
  exports: [
    MenuComponent
  ]
})
export class AdminModule { }
