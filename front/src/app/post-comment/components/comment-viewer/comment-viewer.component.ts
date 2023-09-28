import { Component, Input, OnInit } from '@angular/core';
import { CommentApiService } from '../../../core/services/comment-api.service';
import { Observable, take } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';
import { Post } from '../../interfaces/post.interface';
import { SessionService } from '../../../core/services/session.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comment-viewer',
  templateUrl: './comment-viewer.component.html',
  styleUrls: ['./comment-viewer.component.css']
})
/**
 * CommentViewer component class
 * @author Guillaume Belaud
 * @version 0.0.1
 */
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

  public pageSize: number = 5;
  public pageSizeOptions: Array<number> = [5, 10, 25, 50];

  constructor(private commentService: CommentApiService,
              private sessionService: SessionService,
              private matSnackBar: MatSnackBar) { }

  /**
   * On init, take the comment list related by the present post
   * and take the authenticate user id, and post id
   */
  ngOnInit(): void {
    this.post$.subscribe(x=>{
      this.commentList$ = this.commentService.getAllByPostId(x.id);
      this.newComment.user_id = this.sessionService.user!.id;
      this.newComment.post_id = x.id;
    })
  }

  /**
   * When submit button is pressed, if the text field is not empty
   * call commentService.create to create a new comment
   */
  public submit(){
    if(this.newComment.text !== ""){
      this.commentService.create(this.newComment).pipe(take(1)).subscribe({
        next: (response: Comment) => {
          this.newComment.text = "";
          this.ngOnInit();
          this.matSnackBar.open("Commentaire sauvegardé !", 'Close', { duration: 3000 });
        },
        error: error => this.matSnackBar.open("Une erreur est survenue", 'Close', { duration: 3000 })
      });
    }else{
      this.matSnackBar.open("Veuillez écrire un commentaire !", 'Close', { duration: 3000 });
    }
  }
}

