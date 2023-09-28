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
/**
 * Comment component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;

  public user$!: Observable<User>;

  constructor(private userService: UserApiService) { }

  /**
   * On init, get the user details corresponding to the userId included in the comment
   */
  ngOnInit(): void {
    this.user$ = this.userService.getUser(this.comment.user_id)
  }
}
