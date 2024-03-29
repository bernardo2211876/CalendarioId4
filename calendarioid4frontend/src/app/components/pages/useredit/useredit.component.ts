import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.css']
})
export class UsereditComponent implements OnInit {
  data:any;
  id:any;
  userloginisequal:boolean = false;
  user:User={
    Id :0,

    Idutilizadorcriador:0,

    Datacriacao: '',

    Idutilizadorultimaedicao: 0,

    Dataultimaedicao: '',

    Nome: '',

    Email: '',

    Password: '',

    Nif: 0,

    Codpostal: '',

    Morada: '',

    Telemovel: 0,

    Funcao: '',

    IsAdmin: true,

    Estadoid: 0
  };
  constructor(private _route: ActivatedRoute, private userService: UserServiceService, private _router: Router,
    private _authService: AuthService,private  _toastservice: ToastrService, private _cdref : ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    this._route.paramMap.subscribe({
      next:(params)=>{
         this.id = params.get('id');
      }});

      if(this.id == this.data.id){
        this.userloginisequal==true;
      }

    if(this.data.isAdmin=='False' || this.userloginisequal == true)
    {
      this._toastservice.warning(
        'Necessita de ser admin ou ser a edição dos seus dados para aceder a esta página',
        'Acesso negado'
      )
      this._router.navigateByUrl('/dashboard');
    }
    this.carregarUser();
    //this._cdref.detectChanges();
  }

 public carregarUser(){
        if(this.id){
            this.userService.getUser(this.id)
            .subscribe({
              next:(res)=> {
                this.user=res;
              }
            })
        }
      }

  updateUser(){

    this.userService.updateUser(this.user)
    .subscribe({
      next:(res)=>{
        this._router.navigate(['userlist']);
      }
    });
  }

  editForm = new FormGroup({
    nome: new FormControl("", [
      Validators.required,
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.email
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
  });

  get Nome(): FormControl {
    return this.editForm.get('nome') as FormControl;
  }
  get Email(): FormControl {
    return this.editForm.get('email') as FormControl;
  }

  get Nif(): FormControl {
    return this.editForm.get('nif') as FormControl;
  }
  get Codpostal(): FormControl {
    return this.editForm.get('codpostal') as FormControl;
  }
  get Morada(): FormControl {
    return this.editForm.get('morada') as FormControl;
  }
  get Telemovel(): FormControl {
    return this.editForm.get('telemovel') as FormControl;
  }
  get Funcao(): FormControl {
    return this.editForm.get('funcao') as FormControl;
  }

}
