import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  data:any;
  logoutbutton:any;


  constructor(private authService: AuthService, private router: Router){

  }


  ngOnInit(): void {
  this.logoutbutton = document.getElementById("logout");
    this.data = this.authService.loadCurrentUser();
    this.logoutbutton?.addEventListener("click", ()=>{
      this.Logout();
    })

  }



  Logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }
}
