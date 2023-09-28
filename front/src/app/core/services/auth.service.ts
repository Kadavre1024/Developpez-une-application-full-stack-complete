import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthSuccess  } from '../interfaces/authSuccess.interface';

import { User } from 'src/app/core/interfaces/user.interface';
import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';

@Injectable({
  providedIn: 'root'
})
/**
 * Authentication service class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class AuthService {

  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  /**
   * Send http request to server for registration
   * @param registerRequest Object containing the register params
   * @returns the server response
   */
  public register(registerRequest: Register): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  /**
   * Send http request to server for login
   * @param loginRequest Object containing the login params
   * @returns the server response with authenticated user details
   */
  public login(loginRequest: Login): Observable<AuthSuccess> {
    return this.httpClient.post<AuthSuccess>(`${this.pathService}/login`, loginRequest);
  }

  /**
   * Send http request to server to get the authenticated user details
   * @returns the server response with authenticated user details
   */
  public me(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathService}/me`);
  }
}
