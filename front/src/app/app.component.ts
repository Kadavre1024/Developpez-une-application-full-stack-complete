import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './services/session.service';
import { Observable } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public smallScreen: boolean = false;
  public windowHeight: number = window.innerHeight;
  public sideNavOpened: boolean = false;
  public isLogged$: Observable<boolean> = this.sessionService.$isLogged();
  public savedRoute: string ='';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute) {
      router.events.subscribe((val) => {													// on url change, update Form
          if(this.sideNavOpened){this.sidenav.close()};
          this.smallScreen = (window.innerWidth <= 600) ? true : false;
          this.windowHeight = window.innerHeight;
      });
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
}
