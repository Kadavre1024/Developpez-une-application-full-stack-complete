import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from "./session.service";
import { TopicApiService } from "../topic/services/topic-api.service";
import { Post } from "../interfaces/post.interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
  
export class PostService {
    private pathService = 'api/post';

    constructor(private httpClient: HttpClient,
        private sessionService: SessionService,
        private topicService: TopicApiService){}

    public getById(id: number): Observable<Post>{
        return this.httpClient.get<Post>(`${this.pathService}/${id}`);
    }

    public getAll(): Observable<Post[]>{
        return this.httpClient.get<Post[]>(`${this.pathService}`);
    }

    public create(post: Post): Observable<Post>{
        return this.httpClient.post<Post>(`${this.pathService}`, post);
    }
}