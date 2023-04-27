import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { UserServiceService } from 'src/app/services/services/user.service.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-modaladdaprovador',
  templateUrl: './modaladdaprovador.component.html',
  styleUrls: ['./modaladdaprovador.component.css']
})
export class ModaladdaprovadorComponent {
  myControl = new FormControl<string | User>('');
  options : any[];
  filteredOptions!: Observable<User[]>;
  addAprovadorForm!: FormGroup;
  /**
   *
   */
  constructor(private userService: UserServiceService) {
    this.options=[];
  }
  ngOnInit() {
    this.carregarUsers();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith('e'),
      map(value => {
        const name = typeof value === 'string' ? value : value?.Nome;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  ngAfterViewInit(): void { this.myControl .setValue(''); }

  carregarUsers(){
    this.userService.getAllUsers()
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
}
