import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './pages/admin/admin.module'

import { AppComponent } from './app.component';

import { Comp2Component } from './components/comp2/comp2.component';
import { Comp3Component } from './components/comp3/comp3.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { Comp4Component } from './components/comp4/comp4.component';
import { Comp5Component } from './components/comp5/comp5.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { Comp6Component } from './components/comp6/comp6.component';
import { Comp7Component } from './components/comp7/comp7.component';
import { Comp8Component } from './components/comp8/comp8.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    
    Comp2Component,
    Comp3Component,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    Comp4Component,
    Comp5Component,
    Comp6Component,
    Comp7Component,
    Comp8Component,
    AdminComponent,
    LoginComponent,
    
  ],
  imports: [
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
