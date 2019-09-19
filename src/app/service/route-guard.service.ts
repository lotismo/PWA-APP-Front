import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  constructor(private auth: AuthenticationService,
    private router: Router
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

    console.log(route.url.join('/'));
    if(route.url.join('/') === 'user/-1'){
      return true;
    }
    if(this.auth.isUserLoggedIn()){
      return true;
    }
    this.router.navigate(['/login'])
    return false;
  }
}
