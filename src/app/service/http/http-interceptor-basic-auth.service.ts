import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let basicAuthHeaderString = this.authService.getAuthenticatedToken()
    let username = this.authService.getAuthenticatedUser()
    if (basicAuthHeaderString && username) {
      req = req.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      })
    }
    return next.handle(req);
  }


}
