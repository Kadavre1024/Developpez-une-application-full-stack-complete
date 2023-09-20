import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class TopicApiService{
    private pathService = 'api/topic'

    constructor(private httpClient: HttpClient){}

    public all(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>(`${this.pathService}/all`);
    }

    public detail(id: string): Observable<Topic> {
        return this.httpClient.get<Topic>(`${this.pathService}/${id}`);
    }

    public subscribe(id: string, userId: string): Observable<void> {
        return this.httpClient.post<void>(`${this.pathService}/${id}/subscribe/${userId}`, null);
    }
    
      public unSubscribe(id: string, userId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.pathService}/${id}/subscribe/${userId}`);
    }
}