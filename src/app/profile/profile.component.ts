import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { UserDataService } from '../service/data/user-data.service';
import { AuthenticationService } from '../service/authentication.service';
import { AUTHENTICATED_USER } from '../app.constants';

export class User{
  constructor(
    public id: number,
    public name: string,
    public password: string,
    public email: string,
    public avatar: string
  ){
    
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  message: string
  username: string

  constructor(private route:ActivatedRoute,
    private service: WelcomeDataService,
    private userData: UserDataService,
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userData.getUserByName(sessionStorage.getItem(AUTHENTICATED_USER)).subscribe(
      response => {
        this.user = response ;
        console.log(this.user.name);
      }
    )
  }

  deleteUser(id){
    
    this.userData.deleteUser(id).subscribe(
      response => {
        console.log(`deleted user ${id}`);
        this.message = 'user deleted !!';
        this.auth.logout();
      }
    )
  }

  updateUser(id){
   this.router.navigate(['user', id])
  }

  getWelcomeMessage(){
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handelErrorResponse(error)
    );

    console.log('last line of message')

  }

  createNewUser(){
    // this.router.navigate(['user',-1])
    this.router.navigate(['user',-1])
    //console.log('whaaaakt!!!')
  }

  getWelcomeMessagewithParameter(){
    console.log(this.service.executeHelloWorlServiceWithPath(this.user.name));
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handelErrorResponse(error)
    );

    console.log('last line of message')

  }

  handelErrorResponse(error){
    console.log(error)
  }

  handleSuccessfulResponse(response){
    console.log(response.message);
  }

}
