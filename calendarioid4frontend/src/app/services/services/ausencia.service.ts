import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {
  baseServerUrl="https://localhost:7272/api/";
  constructor(private http: HttpClient) { }

  criarAusencia(ausencia:any){

    return this.http.post(this.baseServerUrl+"Ausencia/CreateAusencia",ausencia);
  }

  getAusencia(id){
    return this.http.get<any>(this.baseServerUrl+"Ausencia/GetAusencia/"+id);
  }

  getAusenciasAceites(){
    return this.http.get<any>(this.baseServerUrl+"Ausencia/getAusenciasAceites");
  }

  getTeletrabalhos(id){
    return this.http.get<any>(this.baseServerUrl+"Ausencia/GetTeletrabalhos/"+id);
  }

  getAusencias(id){
    return this.http.get<any>(this.baseServerUrl+"Ausencia/GetAusencias/"+id);
  }

  getFerias(id){
    return this.http.get<any>(this.baseServerUrl+"Ausencia/GetFerias/"+id);
  }



  getAusenciasPendentes(aprovadorid,tipoausencia):Observable<any>{
    return this.http.post(this.baseServerUrl+"Ausencia/getAusenciasPendentes/"+aprovadorid,{
      tipoid:tipoausencia
    });
  }

  acceptAusencia(id:String){

    return this.http.put(this.baseServerUrl+"Ausencia/Acceptausencia/"+id,'no body');
  }

  declineUser(id:String){

    return this.http.put(this.baseServerUrl+"Ausencia/Disableausencia/"+id,'no body');
  }
}
