import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  data:any;
  displayMsg: string="";
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService, private toastservice:ToastrService){

  }
  ngOnInit(): void {
    this.data = this.authService.loadCurrentUser();
  }

  registerForm = new FormGroup({
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
    this.authService.registerUser(this.registerForm.getRawValue())
    .subscribe(res=>{
      if(res == 200){
        this.toastservice.success(
          'Conta criada com sucesso',
          'Registo'
        )
      }else if(res == 58){
         this.toastservice.warning(
          'A conta já existe. Tente outro e-mail!',
          'Registo'
        )
      }else{
        this.toastservice.error(
          'Não cumpre os requisitos',
          'Registo'
        )
      }
    });
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
