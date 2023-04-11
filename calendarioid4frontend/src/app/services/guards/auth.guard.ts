import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService : AuthService,/*private toastr: ToastrService,*/ private router: Router){}

  canActivate():
   | Observable<boolean | UrlTree>
   | Promise<boolean | UrlTree>
   | boolean
   | UrlTree {
    if(!this.authService.isLoggedin()){
      //this.toastr.info('Por favor faça login');
      alert('Login');
      this.router.navigateByUrl('/login');
      return false;
    }

    this.authService.isLoggedin();
    return true;
  }

}
