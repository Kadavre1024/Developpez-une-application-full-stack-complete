import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * Home component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
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
