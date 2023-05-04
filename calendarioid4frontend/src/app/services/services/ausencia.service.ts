import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {
  baseServerUrl="https://localhost:7272/api/";
  constructor(private http: HttpClient) { }

  criarAusencia(ausencia:any){

    return this.http.post(this.baseServerUrl+"Ausencia/CreateAusencia",ausencia);
  }
}
