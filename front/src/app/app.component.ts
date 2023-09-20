import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './core/services/auth.service';
import { User } from './core/interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public smallScreen: boolean = false;
  public windowHeight: number = window.innerHeight;
  public sideNavOpened: boolean = false;
  public isLogged$: Observable<boolean> = this.sessionService.$isLogged();
  public savedRoute: string ='';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService) {
      router.events.subscribe((val) => {													// on url change, update Form
          if(this.sideNavOpened){this.sidenav.close()};
          this.smallScreen = (window.innerWidth <= 600) ? true : false;
          this.windowHeight = window.innerHeight;
      });
  }

  ngOnInit(): void {
      this.autoLog();
  }

  navBarOpened(event: any) {
    this.sideNavOpened = !this.sideNavOpened;
  }

  handleSize(event: any) {
    this.smallScreen = (window.innerWidth <= 600) ? true : false;
    this.windowHeight = window.innerHeight;
    if(this.sideNavOpened && !this.smallScreen){this.sidenav.close()}
  }

  public $isLogged(): Observable<boolean> {
    this.isLogged$ = this.sessionService.$isLogged();
    return this.isLogged$;
  }

  public logout(): void {
    this.sessionService.logOut();
    this.router.navigate([''])
  }

  public autoLog(): void {
    this.authService.me().subscribe({
      next: (user: User) => {
        this.sessionService.logIn(user);
      },
      error: error => {
        this.sessionService.logOut();
      }
    })
  }
}
