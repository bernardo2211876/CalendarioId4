import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Ausências';
  islogin:boolean = true;
  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {
    var  logoutbutton = document.getElementById("logout");
    logoutbutton?.addEventListener("click", ()=>{
      this.Logout();
    })
  }

  Logout(){
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

}
