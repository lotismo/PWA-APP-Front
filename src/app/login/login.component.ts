import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { AUTHENTICATED_USER } from '../app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = ''
  errorMessage = 'invalid crendenials'
  invalidLogin = false

  constructor(private router:Router,
    private authentication: AuthenticationService
    ) { }

  ngOnInit() {
    if(sessionStorage.getItem(AUTHENTICATED_USER)){
      this.router.navigate(['users']);
    }
  }

  // handleLogin(){
  //   //console.log(this.username);
  //   //if(this.username==='salah' && this.password==='salah'){
  //   if(this.authentication.authenticate(this.username,this.password)){ 
  //   this.router.navigate(['users']);
  //     this.invalidLogin = false
  //   }
  //   else{
  //     this.invalidLogin = true;
  //   }
  // }

  handleAuthLogin(usernameInForm: HTMLInputElement, passwordInForm: HTMLInputElement ){
    //console.log(this.username);
    //if(this.username==='salah' && this.password==='salah'){
      this.username = usernameInForm.value;
      this.password = passwordInForm.value;
    this.authentication.executeAuthService(this.username,this.password)
    .subscribe(
      data => {
        this.router.navigate(['users']);
        this.invalidLogin = false;
      },
      error => {
        this.invalidLogin = true;
      }
    )
  }
}
