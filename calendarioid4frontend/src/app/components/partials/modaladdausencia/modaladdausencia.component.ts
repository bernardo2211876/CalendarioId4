import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { dA } from '@fullcalendar/core/internal-common';
import { ToastrService } from 'ngx-toastr';
import { AusenciaService } from 'src/app/services/services/ausencia.service';
import { AuthService } from 'src/app/services/services/auth.service';



@Component({
  selector: 'app-modaladdausencia',
  templateUrl: './modaladdausencia.component.html',
  styleUrls: ['./modaladdausencia.component.css'],
})
export class ModaladdausenciaComponent implements OnInit {
  currentDate: string;
  data:any;

  constructor(private _toastservice:ToastrService,
    private _router:Router,@Inject(MAT_DIALOG_DATA) public input: any, private _dialog:MatDialog,private _authService:AuthService,
    private _ausenciaService: AusenciaService) {
      const now = new Date;
      this.currentDate = now.toISOString().slice(0, 16);;
  }

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    this.ausenciaForm.get('utilizadorid')?.setValue(this.data.id);
    this.ausenciaForm.get('tipoid')?.setValue(this.input.tipoid);
  }

  ausenciaForm = new FormGroup({
    utilizadorid: new FormControl("", [
      Validators.required,
    ]),
    tipoid: new FormControl("", [
      Validators.required,
    ]),
    datahorainicio: new FormControl("", [
      Validators.required
    ]),
    datahorafim: new FormControl("", [
      Validators.required
    ]),
    motivo: new FormControl("")
  });

  ausenciaSubmited(){
    if(this.input.tipoid == "teletrabalho"){
      this.ausenciaForm.get('tipoid')?.setValue("2");
       }else if(this.input.tipoid == "ferias"){
        this.ausenciaForm.get('tipoid')?.setValue("1");
      }else{
        this.ausenciaForm.get('tipoid')?.setValue("3");
      }

    this._ausenciaService.criarAusencia(this.ausenciaForm.getRawValue())
    .subscribe(res=>{
      if(res == 200){
        this._toastservice.success(
          'A ausencia foi adicionada com sucesso',
          'Ausencia Adicionado'
        )
      }else{
        this._toastservice.error(
          'A ausencia  não foi adicionada com sucesso',
          'Ocorreu um erro'
        )
      }
      this._dialog.closeAll();
    });
  }

  get utilizadorid(): FormControl {
    return this.ausenciaForm.get('utilizadorid') as FormControl;
  }
  get tipoausencia(): FormControl {
    return this.ausenciaForm.get('tipoid') as FormControl;
  }
  get datahorainicio(): FormControl {
    return this.ausenciaForm.get('datahorainicio') as FormControl;
  }

  get datahorafim(): FormControl {
    return this.ausenciaForm.get('datahorafim') as FormControl;
  }
  get motivo(): FormControl {
    return this.ausenciaForm.get('motivo') as FormControl;
  }


}

