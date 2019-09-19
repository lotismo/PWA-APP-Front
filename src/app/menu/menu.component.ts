import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { UserDataService } from '../service/data/user-data.service';
import { AUTHENTICATED_USER } from '../app.constants';
import { User } from '../profile/profile.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isuserLoggedIn: boolean = false;
  user: User;

  constructor(
    public auth: AuthenticationService,
    private userService: UserDataService
  ) { }

  ngOnInit() {
    this.user = new User(0, '', '', '', '');
    this.isuserLoggedIn = this.auth.isUserLoggedIn();
    this.checkOflineStoredRequests();
  }

  checkOflineStoredRequests() {
    if (localStorage.getItem('isPutError') && localStorage.getItem('newPut') && navigator.onLine) {
      var newPut = localStorage.getItem('newPut').split(',');
      this.user.id = parseInt(newPut[0]);
      this.user.name = newPut[1];
      this.user.email = newPut[2];
      console.log(this.user.id+'|'+this.user.name+'|'+this.user.email);
      this.userService.updateUser(this.user.id, this.user).subscribe(
        data => {
          sessionStorage.removeItem(AUTHENTICATED_USER);
          sessionStorage.setItem(AUTHENTICATED_USER, this.user.name);
          console.log('saveUser : ' + this.user.name);
          alert('user updated from when you were offline !!');
          localStorage.removeItem('newPut');
          localStorage.removeItem('isPutError');
          // this.router.navigate(['profile']); 
        },
        error => {
          console.log('oooops, could not update user from offline');
        }
      )


    }
  }

  isUserLoggedIn() {
    return this.isuserLoggedIn;
  }

}
