import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: any;

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
   // this.loginAuth.loginUser([this.loginForm.value.email,
    //this.loginForm.value.password]).subscribe();
    this.authService.loginUser(this.loginForm.getRawValue())
    .subscribe(res=>{

       if(res == 400){
        alert('Credenciais Inválidas');

      }else{
        //this.authService.setToken(res.toString());
        //this.router.navigate(['/dashboard']);
        alert('login com sucesso')
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
