import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private router:Router,
    private http: HttpClient
    ) { }

  authenticate(username,password){
    if(username==='salah' && password==='salah'){
      sessionStorage.setItem(AUTHENTICATED_USER,username)
      return true
    }
  else 
    return false
  }

  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER) 
    sessionStorage.removeItem(TOKEN) 
    this.router.navigate(['login'])
  }

  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  executeAuthService(username,password){
    
    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password)
    let headers = new HttpHeaders({
      Authorization : basicAuthHeaderString
    })
    return this.http.get<AuthenticationBean>(`${API_URL}/basicauth`,{headers})
    .pipe(
      map(data =>{
        sessionStorage.setItem(AUTHENTICATED_USER,username)
        sessionStorage.setItem(TOKEN,basicAuthHeaderString)
        return data 
      }
      )
    )
  }
  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }
  getAuthenticatedToken(){
    if(this.getAuthenticatedUser()){
      return sessionStorage.getItem(TOKEN)
    }
  }

}

export class AuthenticationBean{
  constructor(public messag: string){

  }
}
