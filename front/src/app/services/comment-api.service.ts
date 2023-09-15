import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "./session.service";
import { Observable } from "rxjs";
import { Comment } from "../interfaces/comment.interface";

@Injectable({
    providedIn: 'root'
})
  
export class CommentApiService {
    private pathService = 'api/comment';

    constructor(private httpClient: HttpClient,
        private sessionService: SessionService){}

    public getAllByPostId(id: number): Observable<Comment[]>{
        return this.httpClient.get<Comment[]>(`${this.pathService}/${id}`);
    }

    public create(comment:Comment): Observable<Comment>{
        return this.httpClient.post<Comment>(`${this.pathService}`, comment);
    }
}
