import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comp4Component } from './components/comp4/comp4.component';
import { AdminComponent } from './pages/admin/admin.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PatovaGuard } from './guards/patova.guard';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,canActivate:[PatovaGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
