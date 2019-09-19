import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/profile/profile.component';
import { API_URL } from 'src/app/app.constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private basicAuthHeaderString: string
  private headers: HttpHeaders
  constructor(
    private http: HttpClient
  ) {
    /* this.basicAuthHeaderString = this.createBasicAuthHeaser();
    this.headers = new HttpHeaders({
      Authorization: this.basicAuthHeaderString
    }) */
   }

  getUsers(){
    return this.http.get<User[]>(`${API_URL}/users`)
  }

  getUser(id: number){
    return this.http.get<User>(`${API_URL}/user/${id}`)
  }

  getUserByName(name: string){
    return this.http.get<User>(`${API_URL}/userN/${name}`)
  }

  deleteUser(id){
    return this.http.delete(`${API_URL}/user/${id}`)
  }

  updateUser(id, user){
    console.log('user id : '+id);
    return this.http.put(`${API_URL}/user/${id}`, user)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  createUser(user){
    return this.http.post(`${API_URL}/user`, user)
  }

  public uploadImage(image: File,id) {
    const formData = new FormData();
      
    formData.append('image', image);
    
    return this.http.post<string>(`${API_URL}/user/${id}`, formData);
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      // errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      localStorage.setItem('isPutError', 'error');
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  /* createBasicAuthHeaser(){
    let username = 'avito'
    let password = 'avitopass'
    return 'Basic ' + window.btoa(username + ':' + password);
  } */
}

