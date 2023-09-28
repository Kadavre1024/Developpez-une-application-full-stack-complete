import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic.interface';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

/**
* Topic service class
* @author Guillaume Belaud
* @version 0.0.1
*/
export class TopicApiService{
    private pathService = 'api/topic'

    constructor(private httpClient: HttpClient){}

    /**
    * Send http request to server to get all topics
    * @returns the server response with list of topic objects
    */
    public all(): Observable<Topic[]> {
        return this.httpClient.get<Topic[]>(`${this.pathService}/all`);
    }

    /**
    * Send http request to server to get a topic by its id
    * @param id string corresponding to the searched topic id
    * @returns the server response with the finding topic details
    */
    public detail(id: string): Observable<Topic> {
        return this.httpClient.get<Topic>(`${this.pathService}/${id}`);
    }

    /**
    * Send http request to server to subscribe a user to a topic by their ids
    * @param id string corresponding to the following topic id
    * @param userId string corresponding to the following user id
    * @returns the server response
    */
    public subscribe(id: string, userId: string): Observable<void> {
        return this.httpClient.post<void>(`${this.pathService}/${id}/subscribe/${userId}`, null);
    }
    
    /**
    * Send http request to server to unsubscribe a user to a topic by their ids
    * @param id string corresponding to the following topic id
    * @param userId string corresponding to the following user id
    * @returns the server response
    */
    public unSubscribe(id: string, userId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.pathService}/${id}/subscribe/${userId}`);
    }
}