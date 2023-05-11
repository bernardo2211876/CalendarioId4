import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModaladdaprovadorComponent } from '../../partials/modaladdaprovador/modaladdaprovador.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModaladdausenciaComponent } from '../../partials/modaladdausencia/modaladdausencia.component';

@Component({
  selector: 'app-teletrabalho',
  templateUrl: './teletrabalho.component.html',
  styleUrls: ['./teletrabalho.component.css']
})
export class TeletrabalhoComponent implements OnInit {

  data: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService,
    private _toastservice: ToastrService,
    private _dialog: MatDialog,
    private _cdtr: ChangeDetectorRef
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
        tipoid: "teletrabalho"
      },
    });
  }
}
