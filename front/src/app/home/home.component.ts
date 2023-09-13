import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private registerParam: string = "register";
  private loginParam: string = "login";

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/auth', this.registerParam]);
  }

  login() {
    this.router.navigate(['/auth', this.loginParam]);
  }

}
