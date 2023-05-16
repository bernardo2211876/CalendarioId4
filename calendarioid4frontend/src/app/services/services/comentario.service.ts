import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  baseServerUrl="https://localhost:7272/api/";
  constructor(private http: HttpClient) { }

  getComentarios(id : string): Observable<any> {

    return this.http.get(this.baseServerUrl+"Comentario/Getcomentarios/"+id);
  }

  criarComentario(comentario:any){

    return this.http.post(this.baseServerUrl+"Comentario/CreateComentario",comentario);
  }
}
