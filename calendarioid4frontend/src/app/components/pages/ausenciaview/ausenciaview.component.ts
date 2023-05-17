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
    this.carregarComentarios(this.id);
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
