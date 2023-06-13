import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map, startWith } from 'rxjs';
import { AprovadorService } from 'src/app/services/services/aprovador.service';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-modaladdaprovador',
  templateUrl: './modaladdaprovador.component.html',
  styleUrls: ['./modaladdaprovador.component.css']
})
export class ModaladdaprovadorComponent {
  aprovador = new FormControl<string | User>('',Validators.required)
  options : any[];
  data1 : any;
  filteredOptions!: Observable<User[]>;

  /**
   *
   */
  constructor(private _userService: UserServiceService, private _aprovadorService: AprovadorService,private _toastservice:ToastrService,
    private _router:Router,@Inject(MAT_DIALOG_DATA) public data: any, private _dialog:MatDialog, private _authService: AuthService) {
    this.options=[];
  }


  ngOnInit() {
    this.data1 = this._authService.loadCurrentUser();
   this.carregarNaoAprovadores();
    this.filteredOptions = this.aprovador.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
 // ngAfterViewInit(): void { this.myControl .setValue(''); }

  carregarNaoAprovadores(){
    this._userService.getnaoAprovadores(this.data.iduser)
    .subscribe({
      next: (res)=> {
       this.options=res;
      },
      error: (err)=>{
        console.log(err);
      }
    })


  }

  displayFn(user: User): string {
    return user && user.Nome ? user.Nome : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.Nome.toLowerCase().includes(filterValue));
  }

  aprovadorSubmited(){
    this._aprovadorService.criarAprovador(this.data.iduser ,(<any>this.aprovador.value).Id, this.data1.id)
    .subscribe(res=>{
      if(res == 200){
        this._toastservice.success(
          'O aprovador foi adicionado com sucesso',
          'Aprovador Adicionado'
        )
      }else{
        this._toastservice.error(
          'O aprovador não foi adicionado com sucesso',
          'Ocorreu um erro'
        )
      }
      this.carregarNaoAprovadores();
      this._dialog.closeAll();
    });
  }

}
