import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AusenciaService } from 'src/app/services/services/ausencia.service';
import { AuthService } from 'src/app/services/services/auth.service';
import { ComentarioService } from 'src/app/services/services/comentario.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';

@Component({
  selector: 'app-ausenciaview',
  templateUrl: './ausenciaview.component.html',
  styleUrls: ['./ausenciaview.component.css']
})
export class AusenciaviewComponent implements OnInit{
  id: any;
  userid:any;
  data: any;
  ausencia: any;
  existsausencia:boolean = false;
  existscomentarios:boolean = false;
  isAusenciaaprovador:boolean=false;

  displayedColumns: String[] = [
    'datacriacao',
    'descricao',
    'nome'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private _route: ActivatedRoute,
    private _ausenciaService: AusenciaService,
    private _router: Router,
    private _authService: AuthService,
    private _comentarioService: ComentarioService,
    private _toastservice: ToastrService,
    private _cdref: ChangeDetectorRef,
    private dialog: MatDialog,
    private _userService: UserServiceService

  ) {}



  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    this.userid=this.data.id;

    this._route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
      },
    });

    this.carregarAusencia(this.id);
    this.verifyAprovador(this.userid);


    this.carregarComentarios(this.id);
  }

  verifyAprovador(userid: any) {
    if (userid)
    {
      this._userService.getAprovadores("2").subscribe({
        next: (res) => {

          res.forEach((aprovador: any) => {
            if(userid==aprovador.Id){
              this.isAusenciaaprovador=true;
            }
          });
        },
      });
    }
  }

  comentarioForm = new FormGroup({
    ausenciaid: new FormControl(),
    utilizadorid: new FormControl(),
    descricao: new FormControl("", [
      Validators.required
    ]),
   });

  public carregarAusencia(id) {
    if (id)
    {
      this._ausenciaService.getAusencia(id).subscribe({
        next: (res) => {
          this.ausencia = res;
          this.existsausencia=true;
        },
      });
    }
  }

  public carregarComentarios(id) {
    if (id) {
      this._comentarioService.getComentarios(id).subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.existscomentarios=true;
        },
        error(error) {
          console.log(error);
        },
      });
    }
  }

  comentarioSubmited(){
    this._comentarioService.criarComentario(this.comentarioForm.getRawValue())
    .subscribe(res=>{
      if(res == 200){
        this._toastservice.success(
          'Comentário criado com sucesso',
          'Comentário Adicionado'
        )
      }else{
        this._toastservice.error(
          'Ocorreu um erro',
          'Comentário'
        )
      }
     });
     this._cdref.detectChanges();
    }

  acceptAusencia(id : String){
    this._ausenciaService.acceptAusencia(id,this.userid)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Ausência aceite com sucesso',
          'Ausência Aceite'
        )
        this._cdref.detectChanges();

      }
    });
  }

  declineAusencia(id : String){
    this._ausenciaService.declineAusencia(id,this.userid)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Ausência recusado com sucesso',
          'Ausência Recusado'
        )
        this._cdref.detectChanges();

      }
    });
  }

  cancelAusencia(id : String){
    this._ausenciaService.cancelAusencia(id,this.userid)
    .subscribe({
      next:(res)=>{
        this._toastservice.success(
          'Ausência cancelada com sucesso',
          'Ausência Cancelada'
        )
        this._cdref.detectChanges();

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  get Ausenciaid(): FormControl {
    return this.comentarioForm.get('ausenciaid') as FormControl;
  }
  get Utilizadorid(): FormControl {
    return this.comentarioForm.get('utilizadorid') as FormControl;
  }
  get Descricao(): FormControl {
    return this.comentarioForm.get('descricao') as FormControl;
  }
}
