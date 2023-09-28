import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/services/auth.service';
import { SessionService } from 'src/app/core/services/session.service';
import { AuthSuccess } from 'src/app/core/interfaces/authSuccess.interface';
import { Register } from 'src/app/core/interfaces/register.interface';
import { Login } from 'src/app/core/interfaces/login.interface';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

/**
 * Authentication component class
 * contains login and registration functionnality
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class AuthComponent {

  public smallScreen: boolean = false;
  public onError: boolean = false;
  public funct!: string;
  public halfScreen: number = 0;
  public rememberMe: boolean = false;
  public hide = true;

  public form : FormGroup = this.fb.group({});

  constructor(private authService: AuthService,
              private sessionService: SessionService,
              private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { 
    router.events.subscribe((val) => {													// on url change, update Form
      /**
       * Verify the name of the functionnality required (login or register)
       * to update form with corresponding parameters 
       */
      if (this.funct !== this.route.snapshot.params['funct']){
        this.funct = this.route.snapshot.params['funct'];
        this.smallScreen = (window.innerWidth <= 600) ? true : false;
        this.halfScreen = window.innerWidth/2;
        this.updateForm();
      }
    });
  }

  /**
   * On component init, if in login functionnality and rememberMe has checked by user,
   * try to login user with the stored credentials
   */
  public ngOnInit(): void {
    if(localStorage.getItem('rememberMe') && this.funct === 'login'){
      try{
        this.rememberMe = true;
        const loginRequest=JSON.parse(localStorage.getItem('loginRequest')!);
        this.authService.login(loginRequest).subscribe({
          next: (response: AuthSuccess) => {
              localStorage.setItem('token', response.token);
              this.authService.me().subscribe({
                next: (response) => {
                  this.sessionService.logIn(response);
                  this.router.navigate(['/post'])
                },
                error: error => this.onError = true
              })
          },
          error: error => this.onError = true
        });

      }catch{
        this.rememberMe = false;
      }
    }
  }

  /**
   * Update the form corresponding the functionnality required
   * (login => email, password and rememberMe fields)
   * (register => username, email and password fields)
   */
  public updateForm(): void{
    switch(this.funct){
      case "login":
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          rememberMe: [this.rememberMe]
        });
        break;

      case "register":
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          username: ['', [Validators.required, Validators.min(3), Validators.max(40)]],
          password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
        });
        break;

      default:
        this.router.navigate(['']);
        break;
    }
  }

  public back() {
    window.history.back();
  }

  /**
   * Execution on window resizing event
   * to check if small or large screen
   * @param event 
   */
  handleSize(event: any) {
    this.smallScreen = (event.target.innerWidth <= 600) ? true : false;
    this.halfScreen = window.innerWidth/2;
  }

  /**
   * On submit, call the appropriate function refered to the active route param
   * (login for login function, register for registration function) 
   */
  public submit(): void {
    if(this.funct === "register"){
      const registerRequest = this.form.value as Register;
      this.register(registerRequest);
    }else{
      const loginRequest = this.form.value as Login;
      this.login(loginRequest);
    }
  }

  /**
   * Take the form values and try to register user.
   * If ok, redirect to login functionnality, else onError = true
   * @param registerRequest Object containing user's datas for registration
   */
  public register(registerRequest: Register):void {
    this.authService.register(registerRequest).subscribe({
      next: (_: void) => {
        this.matSnackBar.open("Enregistré avec succès !", 'Fermer', { duration: 3000 });
        this.router.navigate(['/auth', 'login'])
      },
      error: error => this.onError = true
    });
  }

  /**
   * Take the form values and try to login user.
   * If ok, store the loginRequest in localstorge to get credentials for userProfile page
   * and the response token to merge with futur http calls.
   * Then, redirect to 'post' page, else onError = true
   * If ok and RememberMe checked, store the rememberMe to have an automated
   * login with user credentials next time visiting this page
   * @param loginRequest Object containing user's datas for login
   */
  public login(loginRequest: Login):void {
    this.authService.login(loginRequest).subscribe({
      next: (response: AuthSuccess) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('loginRequest', JSON.stringify(loginRequest));
          this.authService.me().subscribe({
            next: (response) => {
              this.sessionService.logIn(response);
              if(this.form.controls['rememberMe'].value){
                localStorage.setItem('rememberMe', JSON.stringify(this.form.controls['rememberMe'].value))
              }
              this.matSnackBar.open(`Bienvenu ${response.userName} !`, 'Fermer', { duration: 3000 });
              this.router.navigate(['/post'])
            },
            error: error => this.onError = true
          })
      },
      error: error => this.onError = true
    });
  }

}
