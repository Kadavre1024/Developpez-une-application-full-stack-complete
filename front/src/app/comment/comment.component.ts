import { Component, Input, OnInit } from '@angular/core';
import { UserApiService } from '../services/user-api.service';
import { Observable } from 'rxjs';
import { Comment } from "../interfaces/comment.interface";
import { User } from '../interfaces/user.interface';

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
