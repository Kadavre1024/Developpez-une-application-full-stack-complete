import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Comment } from "../../post-comment/interfaces/comment.interface";

@Injectable({
    providedIn: 'root'
})
  
/**
* Comment service class
* @author Guillaume Belaud
* @version 0.0.1
*/
export class CommentApiService {
    private pathService = 'api/comment';

    constructor(private httpClient: HttpClient){}

    /**
    * Send http request to server to get al comment for a post by its id
    * @param id number corresponding to id of the related post
    * @returns the server response with the list of comments for the post
    */
    public getAllByPostId(id: number): Observable<Comment[]>{
        return this.httpClient.get<Comment[]>(`${this.pathService}/${id}`);
    }

    /**
    * Send http request to server for create a new comment
    * @param comment Object containing the comment params
    * @returns the server response with the created comment details
    */
    public create(comment:Comment): Observable<Comment>{
        return this.httpClient.post<Comment>(`${this.pathService}`, comment);
    }
}
