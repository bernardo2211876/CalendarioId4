import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  currentUser : BehaviorSubject<any> = new BehaviorSubject(null);
baseServerUrl="https://localhost:7272/api/";
jwtHelperService = new JwtHelperService();

  registerUser(user:any){
    return this.http.post(this.baseServerUrl+"Utilizador/CreateUser",user);
  }

  loginUser(user:any){
    return this.http.post(this.baseServerUrl + 'Utilizador/LoginUser',user);
  }

  setToken(token: string){
    localStorage.setItem("access_token", token);
  }

  loadCurrentUser(){
    const token = localStorage.getItem("access_token");
    const userInfo = token != null ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ?{
      id: userInfo.id,
      nome: userInfo.nome,
      email: userInfo.email,
      telemovel: userInfo.telemovel
    } : null;
    this.currentUser.next(data);
  }
}
