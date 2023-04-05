import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private authService: AuthService, private router : Router, private toastservice:ToastrService){

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
    //this.loginAuth.loginUser([this.loginForm.value.email,
    //this.loginForm.value.password]).subscribe();
    this.authService.loginUser(this.loginForm.getRawValue())
    .subscribe(res=>{

       if(res == 400){
        this.toastservice.success(
          'Credencias inválidas',
          'Login'
        )

      }else{
        //this.authService.setToken(res.toString());
        this.toastservice.success(
          'Login efetuado com sucesso',
          'Login'
        )
        this.router.navigateByUrl('');
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

