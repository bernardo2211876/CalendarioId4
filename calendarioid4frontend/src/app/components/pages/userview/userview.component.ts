import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';
import { ModaladdaprovadorComponent } from '../../partials/modaladdaprovador/modaladdaprovador.component';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  data:any;
  user:any;
  /*user:User={
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
  };*/

  displayedColumns: String[] = ['Id', 'Nome', 'Email', 'Nif','Codpostal','Morada','Telemovel','Funcao','EstadoId'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _route: ActivatedRoute, private userService: UserServiceService, private _router: Router,
    private _authService: AuthService,private  _toastservice: ToastrService, private _cdref : ChangeDetectorRef
    ,private dialog:MatDialog){

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
    this.carregarAprovadores();
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

  public carregarAprovadores(){
    this._route.paramMap.subscribe({
      next:(params)=>{
        const id = params.get('id');
        if(id){
            this.userService.getAprovadores(id)
            .subscribe({
              next:(res)=> {

                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort= this.sort;
                this.dataSource.paginator= this.paginator;

              },
              error(error){
                console.log(error);
              }

            })
        }
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

  OpenDialog(enteranimation:any,exitanimation:any){
    this.dialog.open(ModaladdaprovadorComponent,{
      enterAnimationDuration:enteranimation,
      exitAnimationDuration:exitanimation,
      width:"50%",
      data:{
        iduser:this.user.Id
      }
    })
  }
}
