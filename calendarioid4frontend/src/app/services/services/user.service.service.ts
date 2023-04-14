import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  baseServerUrl="https://localhost:7272/api/";
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]>{

      return this.http.get<User[]>(this.baseServerUrl+"Utilizador");
  }
}
