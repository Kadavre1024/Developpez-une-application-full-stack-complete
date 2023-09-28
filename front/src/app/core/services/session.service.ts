import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})

/**
 * Session service class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class SessionService {

  public isLogged = localStorage.getItem('isLogged') ? true : false;
  public user: User | undefined = localStorage.getItem('userAuth') ? JSON.parse(localStorage.getItem('userAuth')!) : undefined;;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  /**
   * Verify if a user is logged
   * @returns an observable with the logged response (true or false)
   */
  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  /**
   * Set the authenticate user in memory
   * @param user authenticated user details
   */
  public logIn(user: User): void {
    this.user = user;
    this.isLogged = true;
    localStorage.setItem('userAuth', JSON.stringify(this.user))
    localStorage.setItem('isLogged', this.isLogged.toString())
    this.next();
  }

  /**
   * Remove the authenticate user of memory
   */
  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userAuth');
    localStorage.removeItem('isLogged');
    this.user = undefined;
    this.isLogged = false;
    this.next();
  }
  
  /**
   * Send the isLogged value in a Subject
   */
  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
