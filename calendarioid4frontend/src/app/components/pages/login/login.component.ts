import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private authService: AuthService){

  }

  ngOnInit(): void{

  }

  loginForm= new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)
    ]),
  });

  loginSubmited(){
    this.authService.loginUser(this.loginForm.getRawValue())
    .subscribe(res=>{
      if(res == 200){
        alert('Login efetuado com sucesso!');

      }else if(res == 400){
        alert('Credenciais Inválidas');

      }else{
        alert('Alguma coisa correu mal');

      }
    });
  }

  get Email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get Password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
