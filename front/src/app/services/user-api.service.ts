import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../interfaces/user.interface";
import { SessionService } from "./session.service";
import { AuthSuccess } from "../auth/interfaces/authSuccess.interface";
import { UserUpdate } from "../interfaces/user-update.interface";
import { MessageResponse } from "../interfaces/message-response.interface";

@Injectable({
    providedIn: 'root'
  })
export class UserApiService{

    private userAuth: User = this.sessionService.user!;
    private pathService = 'api/user';

    constructor(private httpClient: HttpClient,
        private sessionService: SessionService){}

    public update(userDetailsUpdate: UserUpdate): Observable<MessageResponse> {
        return this.httpClient.put<MessageResponse>(`${this.pathService}/${this.userAuth.id}`, userDetailsUpdate);
    }

    public getUser(id:number): Observable<User> {
        return this.httpClient.get<User>(`${this.pathService}/${id}`);
    }
}