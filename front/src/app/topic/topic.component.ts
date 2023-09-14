import { Component } from "@angular/core";
import { TopicApiService } from "./services/topic-api.service";
import { Topic } from "./interfaces/topic.interface";
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
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

  ngOnInit() {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  public isAlreadySubscribe(topicUsers: number[]): boolean {
    console.log("topicUsers = "+topicUsers.filter(u => u===this.userId));
    if(topicUsers.filter(u => u===this.userId)[0] === this.userId){
      return true;
    }
    return false;
  }

  public subscribe(id: number): void {
    this.topicApiService.subscribe(id.toString(), this.userId.toString()).subscribe(_ => this.fetchSession());
  }

  public unSubscribe(id: number): void {
    this.topicApiService.unSubscribe(id.toString(), this.userId.toString()).subscribe(_ => this.fetchSession());
  }

  private fetchSession(): void {
    this.topics$=this.topicApiService.all();
  }
}
