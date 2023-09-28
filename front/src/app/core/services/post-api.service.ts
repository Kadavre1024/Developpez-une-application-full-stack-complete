import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../../post-comment/interfaces/post.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
/**
 * Post service class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class PostService {
    private pathService = 'api/post';

    constructor(private httpClient: HttpClient){}

    /**
    * Send http request to server get a post by its id
    * @param id number corresponding to the searched post
    * @returns the server response with finding post details
    */
    public getById(id: number): Observable<Post>{
        return this.httpClient.get<Post>(`${this.pathService}/${id}`);
    }

    /**
    * Send http request to server to get all posts
    * @returns the server response with the list of posts
    */
    public getAll(): Observable<Post[]>{
        return this.httpClient.get<Post[]>(`${this.pathService}`);
    }

    /**
    * Send http request to server for creating a new post
    * @param post Object containing the post params
    * @returns the server response with created post details
    */
    public create(post: Post): Observable<Post>{
        return this.httpClient.post<Post>(`${this.pathService}`, post);
    }
}