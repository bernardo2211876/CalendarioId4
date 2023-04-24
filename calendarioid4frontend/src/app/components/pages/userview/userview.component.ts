import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  data:any;
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
    if(this.data.isAdmin=='False')
    {
      this._toastservice.warning(
        'Necessita de ser admin para aceder a esta página',
        'Acesso negado'
      )
      this._router.navigateByUrl('/dashboard');
    }
    this.carregarUser();
  }

  public carregarUser(){
    this._route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id');
        if(id){
            this.userService.getUser(id)
            .subscribe({
              next:(res)=> {
                this.user=res;
              }
            })
        }
      }
    })
  }
}
