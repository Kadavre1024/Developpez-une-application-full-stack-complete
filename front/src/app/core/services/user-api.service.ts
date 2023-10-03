import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { SessionService } from "./session.service";
import { AuthSuccess } from "../interfaces/authSuccess.interface";
import { UserUpdate } from "../../user-profil/interfaces/user-update.interface";
import { MessageResponse } from "../interfaces/message-response.interface";

@Injectable({
    providedIn: 'root'
  })

  /**
 * User service class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class UserApiService{

    private userAuth: User = this.sessionService.user!;
    private pathService = 'api/user';

    constructor(private httpClient: HttpClient,
        private sessionService: SessionService){}

    /**
    * Send http request to server to update user details
    * @param userDetailsUpdate object containing user details to be updated
    * @returns the server response with a message status
    */
    public update(userDetailsUpdate: UserUpdate): Observable<MessageResponse> {
        return this.httpClient.put<MessageResponse>(`${this.pathService}/${this.userAuth.id}`, userDetailsUpdate);
    }

    /**
    * Send http request to server to get user details by its id
    * @param id number corresponding to the following user id
    * @returns the server response with user details
    */
    public getUser(id:number): Observable<User> {
        return this.httpClient.get<User>(`${this.pathService}/${id}`);
    }

    /**
    * Send http request to server to get all users details
    * @returns the server response with users details list
    */
    public getAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(`${this.pathService}/all`);
    }
}