import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  data:any;
  constructor(private authService: AuthService, private router: Router){

  }

  ngOnInit(): void {
    this.data = this.authService.loadCurrentUser();
  }

  Logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
