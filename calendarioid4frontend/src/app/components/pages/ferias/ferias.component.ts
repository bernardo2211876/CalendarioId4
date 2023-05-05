import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/services/auth.service';
import { ModaladdausenciaComponent } from '../../partials/modaladdausencia/modaladdausencia.component';

@Component({
  selector: 'app-ferias',
  templateUrl: './ferias.component.html',
  styleUrls: ['./ferias.component.css']
})
export class FeriasComponent implements OnInit {
  data: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _toastservice: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
  }


  OpenDialog(enteranimation: any, exitanimation: any) {
    this._dialog.open(ModaladdausenciaComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        iduser: this.data.Id,
        tipoid: "ferias"
      },
    });
  }
}
