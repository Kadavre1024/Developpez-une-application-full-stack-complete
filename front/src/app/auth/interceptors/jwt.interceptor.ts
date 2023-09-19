import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Login } from "../interfaces/login.interface";

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    console.log("token : "+ token);
    if (token) {
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
              this.authService.login(JSON.parse(localStorage.getItem('loginRequest')!) as Login);
            }catch{
              console.log('intercept login failed')
            }
          }
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        console.log(errorMsg);
        return throwError(() => errorMsg);
      })
    );
  }
}