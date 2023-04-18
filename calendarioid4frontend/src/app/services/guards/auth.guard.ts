import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService : AuthService,private toastservice: ToastrService, private router: Router){}

  canActivate():
   | Observable<boolean | UrlTree>
   | Promise<boolean | UrlTree>
   | boolean
   | UrlTree {
    if(!this.authService.isLoggedin()){
      this.toastservice.info(
        'Para aceder ao id4calendário tem que iniciar sessão',
        'Sem sessão iniciada'
      )
      this.router.navigateByUrl('/login');
      return false;
    }

    this.authService.isLoggedin();
    return true;
  }

}
