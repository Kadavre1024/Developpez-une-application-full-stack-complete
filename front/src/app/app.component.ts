import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from './core/services/session.service';
import { Observable, take } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './core/services/auth.service';
import { User } from './core/interfaces/user.interface';
import { AuthSuccess } from './core/interfaces/authSuccess.interface';
import { Login } from './core/interfaces/login.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * App component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
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
    private sessionService: SessionService,
    private matSnackBar: MatSnackBar,
    private route : ActivatedRoute) {
      router.events.subscribe((val) => {												// on url change, update Form
        if(router.url!== this.savedRoute){
          this.savedRoute = router.url;
          if(this.sessionService.isLogged){
            this.autoLog();
          }
          if(this.sideNavOpened){this.sidenav.close()};
            this.smallScreen = (window.innerWidth <= 600) ? true : false;
            this.windowHeight = window.innerHeight;
          }
        
      });
  }

  /**
   * On init, try to autolog user
   */
  ngOnInit(): void {
      //this.autoLog();
  }

  /**
   * Detect the sideNav status
   * @param event 
   */
  navBarOpened(event: any) {
    this.sideNavOpened = !this.sideNavOpened;
  }

  /**
   * On window resize, verify if window size is less than 600px width
   * and close sidenav if opened 
   * @param event 
   */
  handleSize(event: any) {
    this.smallScreen = (window.innerWidth <= 600) ? true : false;
    this.windowHeight = window.innerHeight;
    if(this.sideNavOpened && !this.smallScreen){this.sidenav.close()}
  }

  /**
   * Verify if user is logged in
   * @returns isLogged as an observable
   */
  public $isLogged(): Observable<boolean> {
    this.isLogged$ = this.sessionService.$isLogged();
    return this.isLogged$;
  }

  /**
   * Get details of server authenticated user, then login.
   * If error server response and rememberMe in memory, try to 
   * re-log with in memory loginRequest. Else, logout.
   */
  public autoLog(): void {
    this.authService.me().pipe(take(1)).subscribe({
      next: (user: User) => {
        this.sessionService.logIn(user);
      },
      error: error => {
        console.log("1");
        if(localStorage.getItem('rememberMe')){
            console.log("2");
            localStorage.removeItem('token');
            const logreq = JSON.parse(localStorage.getItem('loginRequest')!);
            console.log("LOGREQ : "+logreq.rememberMe);
            this.authService.login(JSON.parse(localStorage.getItem('loginRequest')!) as Login).subscribe({
              next: (response: AuthSuccess) => {
                  localStorage.setItem('token', response.token);
                  console.log("3");
                  window.location.reload();
              },
              error: () => {
                this.logout();
              }
            });
        }else{
          this.logout();
        };
      }});
  }

  public logout():void {
    this.matSnackBar.open("Session expirée !", 'Fermer', { duration: 3000 });
    this.sessionService.logOut();
    this.router.navigate(['/']);
  }
}
