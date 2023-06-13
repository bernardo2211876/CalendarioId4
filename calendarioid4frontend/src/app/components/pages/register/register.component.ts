import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data:any;
  displayMsg: string="";
  isAccountCreated: boolean = false;
  constructor(private _authService: AuthService, private _toastservice:ToastrService, private _router:Router){

  }
  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    if(this.data.isAdmin=='False')
    {
      this._toastservice.warning(
        'Necessita de ser admin para aceder a esta página',
        'Acesso negado'
      )
      this._router.navigateByUrl('/dashboard');
    }
  }

  registerForm = new FormGroup({
    idutilizadorcriador: new FormControl(""),
    idutilizadorultimaedicao: new FormControl(""),
    nome: new FormControl("", [
      Validators.required,
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl("",[
      Validators.required,
      Validators.minLength(8)
    ]),
    nif: new FormControl("",[
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9)
    ]),
    codpostal: new FormControl("",[
      Validators.required
    ]),
    morada: new FormControl("",[
      Validators.required
    ]),
    telemovel: new FormControl("",[
      Validators.required,
     Validators.minLength(9),
     Validators.maxLength(9)
    ]),
    funcao: new FormControl("",[
      Validators.required
    ]),
    isAdmin: new FormControl("",[
      Validators.required
    ]),
  });

  registerSubmited(){
    this._authService.registerUser(this.registerForm.getRawValue())
    .subscribe(res=>{
      if(res == 200){
        this._toastservice.success(
          'Conta criada com sucesso',
          'Registo'
        )
      }else if(res == 58){
         this._toastservice.warning(
          'A conta já existe. Tente outro e-mail!',
          'Registo'
        )
      }else{
        this._toastservice.error(
          'Não cumpre os requisitos',
          'Registo'
        )
      }
    });
  }

  get Idutilizadorcriador(): FormControl {
    return this.registerForm.get('idutilizadorcriador') as FormControl;
  }
  get Idutilizadorultimaedicao(): FormControl {
    return this.registerForm.get('idutilizadorultimaedicao') as FormControl;
  }
  get Nome(): FormControl {
    return this.registerForm.get('nome') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get Nif(): FormControl {
    return this.registerForm.get('nif') as FormControl;
  }
  get Codpostal(): FormControl {
    return this.registerForm.get('codpostal') as FormControl;
  }
  get Morada(): FormControl {
    return this.registerForm.get('morada') as FormControl;
  }
  get Telemovel(): FormControl {
    return this.registerForm.get('telemovel') as FormControl;
  }
  get Funcao(): FormControl {
    return this.registerForm.get('funcao') as FormControl;
  }
  get IsAdmin(): FormControl {
    return this.registerForm.get('isAdmin') as FormControl;
  }
}


