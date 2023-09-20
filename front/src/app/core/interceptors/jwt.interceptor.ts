import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Login } from "../interfaces/login.interface";
import { AuthSuccess } from "../interfaces/authSuccess.interface";
import { SessionService } from "../services/session.service";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private sessionService: SessionService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    if (token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          console.log('Client side error');
        } else {
          console.log('Server side error');
          if(error.status === 500){
            console.log('intercept login try')
            try{
              localStorage.removeItem('token');
              console.log("Saved loginRequest : " + localStorage.getItem('loginRequest'));
              this.authService.login(JSON.parse(localStorage.getItem('loginRequest')!) as Login).subscribe({
                next: (response: AuthSuccess) => {
                    localStorage.setItem('token', response.token);
                    window.location.reload();
                },
                error: () => {
                  console.log('intercept login failed');
                  this.sessionService.logOut();
                }
                
              });
            }catch{
              console.log('intercept failed');
              this.sessionService.logOut();
            }
          }
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(() => errorMsg);
      })
    );
  }
}