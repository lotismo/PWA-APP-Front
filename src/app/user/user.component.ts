import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../service/data/user-data.service';
import { User } from '../profile/profile.component';
import { AUTHENTICATED_USER } from '../app.constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User
  id: number
  fileData: File = null;
  imgsrc;

  constructor(private route: ActivatedRoute,
    private userService: UserDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.user = new User(this.id, '', '', '', '')

    if (this.id != -1)
      this.userService.getUser(this.id).subscribe(
        data => {
          this.user = data;
          // console.log('-------- ' + this.user.avatar);
          // this.user.avatar = this.user.avatar.replace(/\\/g, '\/');
          // console.log('-------- ' + this.user.avatar);
        }
      )
    this.imgsrc = this.user.avatar;
  }

  saveUser() {

    if (this.id === -1) {
      this.userService.createUser(this.user).subscribe(
        data => {
          this.router.navigate(['users'])
        }
      )
    }
    else {
      this.userService.updateUser(this.id, this.user).subscribe(
        data => {
          sessionStorage.removeItem(AUTHENTICATED_USER);
          sessionStorage.setItem(AUTHENTICATED_USER,this.user.name);
          console.log('saveUser : ' + this.user.name);
          this.router.navigate(['users'])
        },
        error => {
          if(localStorage.getItem('isPutError')){
          console.log('oooops you offline?? hmmm :)');
          var newPut = this.id + ","+this.user.name +","+this.user.email;
          localStorage.setItem('newPut', newPut);
          }
        }
      )
    }
  }

  //change avatar (image)
  changeAvatar(imageInput: any) {
    const file: File = imageInput.files[0];

    const reader = new FileReader();
    this.imgsrc = window.URL.createObjectURL(file);
    reader.addEventListener('load', (event: any) => {

      this.userService.uploadImage(file, this.user.id).subscribe(
        data => {
          console.log('good : result : ' + data)
          this.user.avatar = data.replace('unsafe', '');
        },
        error => {
          console.log('error : result : ' + error)
        })
    });
    // wait for image to load
    reader.readAsDataURL(file);
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.imgsrc = event.target.result;
      }
    }
  }



}
