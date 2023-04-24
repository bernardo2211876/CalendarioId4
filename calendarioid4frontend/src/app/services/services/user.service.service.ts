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

  getAllUsers(): Observable<any>{

      return this.http.get(this.baseServerUrl+"Utilizador");
  }

  getUser(id : string): Observable<User> {

    return this.http.get<User>(this.baseServerUrl+"Utilizador/GetUser/"+id);
  }

  updateUser(user:any):Observable<User>{

    return this.http.put<User>(this.baseServerUrl+"Utilizador/Edituser/"+user.id ,user);
  }
}
