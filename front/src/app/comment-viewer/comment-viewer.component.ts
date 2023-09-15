import { Component, Input, OnInit } from '@angular/core';
import { CommentApiService } from '../services/comment-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';
import { Post } from '../interfaces/post.interface';
import { SessionService } from '../services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
export class CommentViewerComponent implements OnInit {
  @Input() post$!: Observable<Post>;

  public commentList$!: Observable<Comment[]>;
  public text: string = "";
  public newComment: Comment ={
    id: 0,
    text: '',
    user_id: 0,
    post_id: 0,
    createdAt: new Date()
  }

  constructor(private commentService: CommentApiService,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.post$.subscribe(x=>{
      this.commentList$ = this.commentService.getAllByPostId(x.id);
      console.log("x.id : "+x.id);
      this.newComment.user_id = this.sessionService.user!.id;
      console.log("user.id : "+this.newComment.user_id);
      this.newComment.post_id = x.id;
    })
  }

  public submit(text:string){
    if(text !== ""){
      console.log("text : "+text);
      this.newComment.text = text;
      this.commentService.create(this.newComment).subscribe({
        next: (response: Comment) => {
          this.newComment.text = "";
          this.ngOnInit();
          this.matSnackBar.open("Commented Successfully !", 'Close', { duration: 3000 });
        },
        error: error => this.matSnackBar.open("An error occured", 'Close', { duration: 3000 })
      });
    }else{
      this.matSnackBar.open("You need to write a comment before sending !", 'Close', { duration: 3000 });
    }
  }
}

