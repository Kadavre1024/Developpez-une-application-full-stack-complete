import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from './interfaces/register.interface';
import { Login } from './interfaces/login.interface';
import { AuthSuccess } from './interfaces/authSuccess.interface';
import { User } from '../interfaces/user.interface';
import { SessionService } from '../services/session.service';

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

  public form : FormGroup = this.fb.group({});

  constructor(private authService: AuthService,
              private sessionService: SessionService,
              private fb: FormBuilder,
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

  public updateForm(): void{
    switch(this.funct){
      case "login":
        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.min(6)]]
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
      console.log("register : " + registerRequest.username + " "  + registerRequest.email + " " + registerRequest.password);
      this.authService.register(registerRequest).subscribe({
        next: (_: void) => this.router.navigate(['/auth', 'login']),
        error: error => this.onError = true
      });
    }else{
      const loginRequest = this.form.value as Login;
      console.log("login : " + loginRequest.email + " " + loginRequest.password);
      this.authService.login(loginRequest).subscribe({
        next: (response: AuthSuccess) => {
            this.sessionService.logIn(response);
            this.router.navigate(['/topic'])
        },
        error: error => this.onError = true
      });
    }
  }

}
