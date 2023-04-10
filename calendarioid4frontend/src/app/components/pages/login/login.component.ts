import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  constructor(private authService: AuthService, public router:Router){

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
    .subscribe( (res: any)=>{

       if(res == 400){
        alert('Credenciais Inválidas');

      }else{
        let token = res.token;
        this.authService.setToken(token);
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
