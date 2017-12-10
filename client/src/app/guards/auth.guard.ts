//this is copy paster with modificaiton from https://angular.io/guide/router section src/app/auth-guard.service.ts (v2)
import { Injectable }     from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot,RouterStateSnapshot }    from '@angular/router';
import {AuthService} from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  redirectURL;

  constructor(private authService:AuthService,
              private router: Router){}

  canActivate(router: ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    if(this.authService.loggedIn()){
      return true;
    }else {
      this.redirectURL=state.url; //this is the URL that the user originally requested, before getting routed to the login page
      this.router.navigate(['/login'])
      return false;
    }
  }
}
