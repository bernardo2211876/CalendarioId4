import { Data } from "@angular/router";

export interface User{
  Id :number;

  Idutilizadorcriador: number;

  Datacriacao: string;

  Idutilizadorultimaedicao: number;

  Dataultimaedicao: string;

  Nome: string;

  Email: string;

  Password: string;

  Nif: number;

  Codpostal: string;

  Morada: string;

  Telemovel: number;

  Funcao: string;

  IsAdmin: boolean;

  Estadoid: number;
}

