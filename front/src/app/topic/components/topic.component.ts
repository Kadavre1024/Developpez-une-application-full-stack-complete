import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Topic } from "src/app/core/interfaces/topic.interface";
import { SessionService } from "src/app/core/services/session.service";
import { TopicApiService } from "src/app/core/services/topic-api.service";


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
/**
 * Topic component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class TopicComponent {

  public topics$: Observable<Topic[]> = this.topicApiService.all();
  public userId: number = this.sessionService.user!.id;
  public mybreakpoint: number = 1;
  public descriptionRowsView: number = 1;
  public descriptionHeightView: number = 40;

  constructor(
    private topicApiService: TopicApiService,
    private sessionService: SessionService
  ) { }

  /**
   * On init, verify the screen size to adapt the DOM
   */
  ngOnInit() {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  /**
   * Verify the screen size to adapt the DOM
   * @param event
   */
  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  /**
   * Verify if user has already subscribe to the topic
   * @param topicUsers list of user ids subscribing the topic
   * @returns true if already subscribed, else false
   */
  public isAlreadySubscribe(topicUsers: number[]): boolean {
    if(topicUsers.filter(u => u===this.userId)[0] === this.userId){
      return true;
    }
    return false;
  }

  /**
   * Subscribe a user to the topic by its id
   * @param id the user id
   */
  public subscribe(id: number): void {
    this.topicApiService.subscribe(id.toString(), this.userId.toString()).subscribe(_ => this.fetchSession());
  }

  /**
   * Unsubscribe a user to the topic by its id
   * @param id the user id
   */
  public unSubscribe(id: number): void {
    this.topicApiService.unSubscribe(id.toString(), this.userId.toString()).subscribe(_ => this.fetchSession());
  }

  /**
   * Get the list of all topics
   */
  private fetchSession(): void {
    this.topics$=this.topicApiService.all();
  }
}
