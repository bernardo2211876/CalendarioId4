import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AusenciaService } from 'src/app/services/services/ausencia.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';

@Component({
  selector: 'app-teletrabalhoaprov',
  templateUrl: './teletrabalhoaprov.component.html',
  styleUrls: ['./teletrabalhoaprov.component.css']
})
export class TeletrabalhoaprovComponent implements OnInit {

  data:  any;

  displayedColumns: string[] = ['Id', 'Utilizadorid', 'Datahorainicio', 'Datahorafim','Motivo','Funcionalidades'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _ausenciaService: AusenciaService, private _cdref : ChangeDetectorRef, private _authService: AuthService
    ,private _toastservice: ToastrService,private _router: Router) {}

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    if(this.data.isAprovador=='False')
    {
      this._toastservice.warning(
        'Necessita de ser aprovador para aceder a esta página',
        'Acesso negado'
      )
      this._router.navigateByUrl('/dashboard');
    }
    this.carregarAusenciaspendentes();
  }

  carregarAusenciaspendentes(){
    this._ausenciaService.getAusenciasPendentes(this.data.id,2)
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

  acceptAusencia(id : String){
    this._ausenciaService.acceptAusencia(id,this.data.id)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Teletrabalho aceite com sucesso',
          'Teletrabalho Aceite'
        )
        this._cdref.detectChanges();
        this.carregarAusenciaspendentes();
      }
    });
  }

  declineAusencia(id : String){
    this._ausenciaService.declineAusencia(id,this.data.id)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Teletrabalho recusado com sucesso',
          'Teletrabalho Recusado'
        )
        this._cdref.detectChanges();
        this.carregarAusenciaspendentes();
      }
    });

  }

}
