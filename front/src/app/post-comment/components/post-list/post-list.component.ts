import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Topic } from '../../../core/interfaces/topic.interface';
import { PostService } from '../../../core/services/post-api.service';
import { SessionService } from '../../../core/services/session.service';
import { TopicApiService } from '../../../core/services/topic-api.service';
import { Post } from '../../interfaces/post.interface';
import { User } from '../../../core/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
/**
 * PostList component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
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

  /**
   * On init, verify the screen size to adapt the DOM,
   * and get the list of all user subscribed topics
   */
  ngOnInit(): void {
    this.mybreakpoint = (window.innerWidth <= 600) ? 1 : 2;
    this.descriptionRowsView = (window.innerWidth <= 600) ? 4 : 3;
    this.descriptionHeightView = (window.innerWidth <= 600) ? 55 : 40;

    this.topicApiService.all().subscribe((x) => this.getPostsForUser(x));
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
   * Get topic details by its id
   * @param topicId number corresponding to the related topic
   * @returns an observable containing the finding topic details
   */
  public getTopicName(topicId: number): Observable<Topic> {
    let topicName$ : Observable<Topic>;
    topicName$ = this.topicApiService.detail(topicId.toString())
    return topicName$;
  }

  /**
   * Function to redirect to post create page
   */
  public redirectToCreate(){
    this.router.navigate(['/post/create']);
  }

  /**
   * Get the Post list corresponding to user subscribed topics
   * @param topics list of topics
   */
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

  /**
   * Sort the post list by clicking on the sort button
   */
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

  /**
   * Sort the post list :
   * - by date (asc or desc)
   * - by default (by topics)
   * @param posts posts list
   * @param direction sort function
   * @returns sorted post list
   */
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

