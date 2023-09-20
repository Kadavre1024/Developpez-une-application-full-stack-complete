import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../../core/services/session.service';
import { PostService } from '../../../core/services/post-api.service';
import { Post } from '../../interfaces/post.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TopicApiService } from '../../../core/services/topic-api.service';
import { Observable, map, take } from 'rxjs';
import { Topic } from '../../../core/interfaces/topic.interface';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  public onError = false;
  public topic$: Observable<Topic[]> = this.topicService.all().pipe(map(topics => topics.filter(topic => topic.users.includes(this.sessionService.user!.id))));
  public newPost: Post = {
    id: 0,
    title: '',
    text: '',
    topic_id: 0,
    user_id: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  public form : FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.min(3), Validators.max(40)]],
    text: ['', [Validators.required, Validators.min(3), Validators.max(16000)]],
    topic_id: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private matSnackBar: MatSnackBar,
              private sessionService: SessionService,
              private topicService: TopicApiService,
              private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public back() {
    window.history.back();
  }

  submit(){
    this.newPost = this.form?.value as Post;
    this.newPost.user_id = this.sessionService.user!.id;
    this.postService.create(this.newPost).pipe(take(1)).subscribe({
      next: (response: Post) => {
        this.matSnackBar.open("Post created successfully !", "close", {duration: 3000});
        this.router.navigate(['/post']);
      },
      error: error => this.onError = true
    })
  }

}

