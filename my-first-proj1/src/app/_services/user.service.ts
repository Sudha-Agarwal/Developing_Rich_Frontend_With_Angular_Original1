import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url= 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  checkLogin(user:User):Observable<{ message: string}>{   
    //here we would make connection with the server using HttpClient
    return this.http.post<{ message: string}>(this.url + '/login', user);
  }
}
