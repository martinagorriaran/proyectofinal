//se importan los -- necesarios
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})

export class PatovaGuard implements CanActivate {


  //inyectamos en el constructor los servicios
  constructor(private cookie:CookieService, private router: Router){}

  //
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //si el usuario esta logueado devuelve true
      if(this.cookie.check('idToken')){
        return true
      }
      //si no lo lleva a la ruta login
      else{
        this.router.navigateByUrl("login")
        return false
      }
  }
  
}
