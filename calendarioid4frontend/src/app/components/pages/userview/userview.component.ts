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
import { AprovadorService } from 'src/app/services/services/aprovador.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css'],
})
export class UserviewComponent implements OnInit {
  id: any;
  data: any;
  user: any;
  existsuser:boolean = false;
  existsaprovadores:boolean = false;
  displayedColumns: String[] = [
    'Id',
    'Nome',
    'Email',
    'Nif',
    'Codpostal',
    'Morada',
    'Telemovel',
    'Funcao',
    'Funcionalidades',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _route: ActivatedRoute,
    private userService: UserServiceService,
    private _aprovadorService: AprovadorService,
    private _router: Router,
    private _authService: AuthService,
    private _toastservice: ToastrService,
    private _cdref: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    if (this.data.isAdmin == 'False') {
      this._toastservice.warning(
        'Necessita de ser admin para aceder a esta página',
        'Acesso negado'
      );
      this._router.navigateByUrl('/dashboard');
    }

    this._route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });

    this.carregarUser(this.id);
    this.carregarAprovadores(this.id);
  }

  public carregarUser(id) {
    if (id)
    {
      this.userService.getUser(id).subscribe({
        next: (res) => {
          this.user = res;
          this.existsuser=true;
        },
      });
    }
  }

  public carregarAprovadores(id) {
    if (id) {
      this.userService.getAprovadores(id).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.existsaprovadores=true;
        },
        error(error) {
          console.log(error);
        },
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OpenDialog(enteranimation: any, exitanimation: any) {
    this.dialog.open(ModaladdaprovadorComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        iduser: this.user.Id,
      },
    });
  }

  RemoveAprovador(id){
    this._aprovadorService.RemoveAprovador(this.user.Id,id)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Aprovador removido com sucesso',
          'Aprovador removido'
        )
        this._cdref.detectChanges();
        this.carregarAprovadores(this.id);
      }
    });
  }

  formatDateTime(dateTime: string): string {
    const date = new Date(dateTime);
    const day = date.getDate();
    const month = this.getMonthName(date.getMonth());
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${day} de ${month}, ${year}, ${hours}:${minutes}:${seconds}`;
  }

  getMonthName(monthIndex: number): string {
    const monthNamesPt = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return monthNamesPt[monthIndex];
  }
}
