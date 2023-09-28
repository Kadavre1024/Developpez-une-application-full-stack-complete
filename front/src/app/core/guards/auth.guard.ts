import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})
/**
 * Authentication guard class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class AuthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private sessionService: SessionService,
  ) {
  }
  /**
   * Verify if user is logged, else redirect to login page
   * @returns true if user is logged, else false
   */
  public canActivate(): boolean {
    if (!this.sessionService.isLogged) {
      this.router.navigate(['auth','login']);
      return false;
    }
    return true;
  }
}