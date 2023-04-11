import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
data: any;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
     this.data = this.authService.loadCurrentUser();
  }

  logOut(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

}
