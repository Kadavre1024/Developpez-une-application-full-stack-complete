import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { UserApiService } from 'src/app/core/services/user-api.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { Comment } from '../../interfaces/comment.interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  public user$!: Observable<User>;

  constructor(private userService: UserApiService) { }

  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.comment.user_id)
  }
}
