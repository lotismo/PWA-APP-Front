import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../service/data/user-data.service';
import { User } from '../profile/profile.component';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  message: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserDataService
  ) { }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {
    this.userService.getUsers().subscribe(
      data => this.users = data
    )
  }

  deleteUser(id) {

    this.userService.deleteUser(id).subscribe(
      response => {
        this.message = `delete user ${id} successful`;
        this.refreshUsers();
        // console.log(`deleted user ${id}`);
        // this.auth.logout();
      }
    )
  }

  createNewUser() {
    this.router.navigate(['user', -1])
  }

  goToUser(id) {
    this.router.navigate(['user', id]);
  }

}
