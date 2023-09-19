import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Topic } from '../topic/interfaces/topic.interface';
import { PostService } from '../services/post-api.service';
import { SessionService } from '../services/session.service';
import { TopicApiService } from '../topic/services/topic-api.service';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public filteredPosts: Post[] = [];
  public topics$!: Observable<Topic[]>;
  public userPosts$!: Observable<Post[]>;
  public topicName: Array<string> = [];
  public orderSort: string = '';
  
  public user: User = this.sessionService.user!;
  public mybreakpoint: number = 1;
  public descriptionRowsView: number = 1;
  public descriptionHeightView: number = 40;

  constructor(private postService: PostService,
    private topicApiService: TopicApiService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;

    this.topicApiService.all().subscribe((x) => this.getPostsForUser(x));
  }

  handleSize(event: any) {
    this.mybreakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;
  }

  public getTopicName(topicId: number): Observable<Topic> {
    let topicName$ : Observable<Topic>;
    topicName$ = this.topicApiService.detail(topicId.toString())
    return topicName$;
  }

  public redirectToCreate(){
    this.router.navigate(['/post/create']);
  }

  private getPostsForUser(topics : Topic[]): void{
    const topic_id_list: number[] = [];
    topics.forEach((topic) => {
      if(topic.users.includes(this.user.id)){
        this.topicName.push(topic.name);
        topic_id_list.push(topic.id!);
      }; 
    });
    this.userPosts$ = this.postService.getAll().pipe(
      map((posts: Post[]) => posts.filter((post:Post)=> topic_id_list.includes(post.topic_id))),
      map((posts: Post[]) => this.postOrderBy(posts, this.orderSort))
    );      
  }

  dataSort(){
    switch (this.orderSort){
      case '':{
        this.orderSort = 'asc';
        break;
      }
      case 'asc':{
        this.orderSort = 'desc';
        break;
      }
      default:{
        this.orderSort = '';
        break;
      }
    }
    this.topicApiService.all().subscribe((x) => this.getPostsForUser(x));
  }

  public postOrderBy(posts: Post[], direction?: string): Post[]{
    let filteredList: Post[] = [];
    switch (direction) {
      case 'asc':{
        filteredList = posts.sort((a, b) => {return a.createdAt < b.createdAt ? -1 : 1;});
        break;
      }
      case 'desc':{
        filteredList = posts.sort((a, b) => {return a.createdAt < b.createdAt ? 1 : -1;});
        break;
      }
      default:{
        filteredList = posts.sort((a, b) => {return a.topic_id < b.topic_id ? -1 : 1;});;
        break;
      } 
    }
    return filteredList;
  }
}

