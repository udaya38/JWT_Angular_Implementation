import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private tokenService: TokenService, private route: Router) { }
  canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    if(this.tokenService.getTokenValue() && state.url === '/login'){
      this.route.navigate(['/','child']);
    }
    else if(!this.tokenService.getTokenValue() && state.url === '/login'){
      return true;
    }
    else if(!this.tokenService.getTokenValue()){
      this.route.navigate(['/','login']);
    }
    else{
      return true;
    }
  }
}
