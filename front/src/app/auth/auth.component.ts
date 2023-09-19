import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './interfaces/register.interface';
import { Login } from './interfaces/login.interface';
import { AuthSuccess } from './interfaces/authSuccess.interface';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
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
      if (this.funct !== this.route.snapshot.params['funct']){
        this.funct = this.route.snapshot.params['funct'];
        this.smallScreen = (window.innerWidth <= 600) ? true : false;
        this.halfScreen = window.innerWidth/2;
        this.updateForm();
      }
    });
  }

  public ngOnInit(): void {
    if(localStorage.getItem('loginRegister')){
      try{
        this.rememberMe = true;
        const loginRequest=JSON.parse(localStorage.getItem('loginRegister')!);
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

  public updateForm(): void{
    switch(this.funct){
      case "login":
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.min(6)]],
          rememberMe: [this.rememberMe]
        });
        break;

      case "register":
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          username: ['', [Validators.required, Validators.min(3), Validators.max(40)]],
          password: ['', [Validators.required, Validators.min(6)]]
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

  handleSize(event: any) {
    this.smallScreen = (event.target.innerWidth <= 600) ? true : false;
    this.halfScreen = window.innerWidth/2;
  }

  public submit(): void {
    if(this.funct === "register"){
      const registerRequest = this.form.value as Register;
      this.authService.register(registerRequest).subscribe({
        next: (_: void) => {
          this.matSnackBar.open("Registered Successfully !", 'Close', { duration: 3000 });
          this.router.navigate(['/auth', 'login'])
        },
        error: error => this.onError = true
      });
    }else{
      const loginRequest = this.form.value as Login;
      this.authService.login(loginRequest).subscribe({
        next: (response: AuthSuccess) => {
            localStorage.setItem('token', response.token);
            this.authService.me().subscribe({
              next: (response) => {
                this.sessionService.logIn(response);
                if(this.form.controls['rememberMe'].value){
                  localStorage.setItem('loginRegister', JSON.stringify(loginRequest));
                }
                this.router.navigate(['/profil'])
              },
              error: error => this.onError = true
            })
        },
        error: error => this.onError = true
      });
    }
  }

}
