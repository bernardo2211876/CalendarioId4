import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  displayMsg: string="";
  isAccountCreated: boolean = false;
  constructor(private authService: AuthService){

  }
  ngOnInit(): void {

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
      /*[
      this.registerForm.value.nome,
     this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.nif,
      this.registerForm.value.codpostal,
      this.registerForm.value.morada,
      this.registerForm.value.telemovel,
      this.registerForm.value.funcao,
      this.registerForm.value.isAdmin,
    ]*/
    .subscribe(res=>{
      if(res == 'Success'){
        this.displayMsg ='Account created Successfully!';
        this.isAccountCreated = true;
      }else if(res == 'Already Exist'){
        this.displayMsg ='Account Already Exist. Try another email.';
        this.isAccountCreated = false;
      }else{
        this.displayMsg ='Something went wrong';
        this.isAccountCreated = false;
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
