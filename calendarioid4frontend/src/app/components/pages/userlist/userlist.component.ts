import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  users: any ;
  data:  any;
  showContent: any;
  dtoptions:DataTables.Settings={};
  dttrigger:Subject<any>= new Subject<any>();

  constructor(private userService: UserServiceService, private _cdref : ChangeDetectorRef, private _authService: AuthService
    ,private _toastservice: ToastrService,private _router: Router) {}

  ngOnInit(): void {
    setTimeout(()=>this.showContent=true, 250);
    this.users=[];
    this.dtoptions={
      pagingType:'full_numbers'
    };
    this.data = this._authService.loadCurrentUser();
    if(this.data.isAdmin=='False')
    {
      this._toastservice.warning(
        'Necessita de ser admin para aceder a esta página',
        'Acesso negado'
      )
      this._router.navigateByUrl('/dashboard');
    }
    this.carregarUsers();
  }

  carregarUsers(){
    this.userService.getAllUsers()
    .subscribe({
      next: (res)=> {
       this.users = res ;
        this.dttrigger.next(null);
      },
      error: (res)=>{
        console.log(res);
      }
    })
  }


}
