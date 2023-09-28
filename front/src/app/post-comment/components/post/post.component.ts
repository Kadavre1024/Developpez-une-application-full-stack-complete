import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post-api.service';
import { TopicApiService } from '../../../core/services/topic-api.service';
import { SessionService } from '../../../core/services/session.service';
import { Observable, take } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { UserApiService } from '../../../core/services/user-api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../core/interfaces/user.interface';
import { Topic } from '../../../core/interfaces/topic.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
/**
 * Post component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class PostComponent implements OnInit {
  public post$!: Observable<Post>;
  public author$!: Observable<User>;
  public topic$!: Observable<Topic>;
  public postId: number = +this.route.snapshot.params['id'];

  constructor(
    private postService: PostService,
    private userService: UserApiService,
    private topicApiService: TopicApiService,
    private sessionService: SessionService,
    private route: ActivatedRoute) { }

  /**
   * On init, get the post details related by the postId
   * and get the user and topic related by this post
   */
  ngOnInit(): void {
    this.post$ = this.postService.getById(this.postId);
    this.post$.pipe(take(1)).subscribe(x => {
      this.author$ = this.userService.getUser(x.user_id);
      this.topic$ = this.topicApiService.detail(x.topic_id.toString())
    })
  }

  /**
   * Return to previous page
   */
  public back() {
    window.history.back();
  }

}
