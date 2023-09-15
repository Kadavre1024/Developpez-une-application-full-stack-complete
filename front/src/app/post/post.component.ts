import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post-api.service';
import { TopicApiService } from '../topic/services/topic-api.service';
import { SessionService } from '../services/session.service';
import { Observable, take } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import { UserApiService } from '../services/user-api.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user.interface';
import { Topic } from '../topic/interfaces/topic.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post$!: Observable<Post>;
  public author$!: Observable<User>;
  public topic$!: Observable<Topic>;

  constructor(
    private postService: PostService,
    private userService: UserApiService,
    private topicApiService: TopicApiService,
    private sessionService: SessionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postService.getById(postId);
    this.post$.pipe(take(1)).subscribe(x => {
      this.author$ = this.userService.getUser(x.user_id);
      this.topic$ = this.topicApiService.detail(x.topic_id.toString())
    })
  }

  public back() {
    window.history.back();
  }

}
