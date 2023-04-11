import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data : any;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.data = this.authService.loadCurrentUser();
  }

}
