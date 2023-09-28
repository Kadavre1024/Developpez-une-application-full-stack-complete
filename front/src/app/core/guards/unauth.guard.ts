import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router"; 
import { SessionService } from "../services/session.service";

@Injectable({providedIn: 'root'})

/**
 * Unauthentication guard class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class UnauthGuard implements CanActivate {

  constructor( 
    private router: Router,
    private sessionService: SessionService,
  ) {
  }

  /**
   * Verify if user is not logged, else redirect to post page
   * @returns true if user is not logged, else false
   */
  public canActivate(): boolean {
    if (this.sessionService.isLogged) {
      this.router.navigate(['/post']);
      return false;
    }
    return true;
  }
}