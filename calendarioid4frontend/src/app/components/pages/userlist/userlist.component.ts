import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { resetNormalizeCache } from '@angular-devkit/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  data:  any;

  displayedColumns: string[] = ['Id', 'Nome', 'Email', 'Nif','Codpostal','Morada','Telemovel','Funcao','EstadoId', 'Funcionalidades'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserServiceService, private _cdref : ChangeDetectorRef, private _authService: AuthService
    ,private _toastservice: ToastrService,private _router: Router) {}

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
    this.carregarUsers();

  }



  carregarUsers(){
    this.userService.getAllUsers()
    .subscribe({
      next: (res)=> {
       this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator= this.paginator;
      },
      error: (err)=>{
        console.log(err);
      }
    })


  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  enableUser(id : String){
    this.userService.EnableUser(id)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Utilizador ativado com sucesso',
          'Utilizador Ativado'
        )
        this._cdref.detectChanges();
        this.carregarUsers();
      }
    });
  }

  disableUser(id : String){
    this.userService.DisableUser(id)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Utilizador desativado com sucesso',
          'Utilizador desativo'
        )
        this._cdref.detectChanges();
        this.carregarUsers();
      }
    });

  }

}



