import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

baseServerUrl="https://localhost:7272/api/";

  registerUser(user:any){
    return this.http.post(this.baseServerUrl+"Utilizador/CreateUser",user);
  }

  loginUser(user:any){
    return this.http.post(this.baseServerUrl + 'Utilizador/LoginUser',user);
  }
}
