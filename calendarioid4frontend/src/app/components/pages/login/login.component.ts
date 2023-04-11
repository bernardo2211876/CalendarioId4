import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router : Router, private toastservice:ToastrService){

  }

  ngOnInit(): void{
    if(this.authService.isLoggedin()==true){
     // this.toastr.info('Já se encontra logado');
      this.router.navigateByUrl('/dashboard');
    }
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
    .subscribe( (res: any)=>{

       if(res == 400){
        this.toastservice.error(
          'Credencias inválidas',
          'Login'
        )

      }else{
        let token = res.token;
        this.authService.setToken(token);
        this.toastservice.success(
          'Login efetuado com sucesso',
          'Login'
        )
        this.router.navigateByUrl('/dashboard');

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

