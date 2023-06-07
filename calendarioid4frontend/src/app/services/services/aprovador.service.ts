import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AprovadorService {
  baseServerUrl="https://localhost:7272/api/";
  constructor(private http: HttpClient) { }

  criarAprovador(id:any,ida:any,idcreate:any){

    return this.http.post(this.baseServerUrl+"Aprovador/AdicionarAprovacao",{
      utilizadorid:id,
      aprovadorid:ida,
      idutilizadorultimaedicao:idcreate,
      idutilizadorcriador:idcreate
    });
  }

  RemoveAprovador(id:any,ida:any){
    return this.http.post(this.baseServerUrl+"Aprovador/RemoverAprovacao",{
      utilizadorid:id,
      aprovadorid:ida
    });
  }
}
