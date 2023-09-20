import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CoreModule } from '../core/core.module';
import { CommentViewerComponent } from './components/comment-viewer/comment-viewer.component';
import { CommentComponent } from './components/comment/comment.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PostRoutingModule } from './post-routing.module';



@NgModule({
  declarations: [
    CommentComponent,
    CommentViewerComponent,
    PostComponent,
    PostFormComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    PostRoutingModule
  ],
  exports:[
    CommentComponent,
    CommentViewerComponent,
    PostComponent,
    PostFormComponent,
    PostListComponent
  ]
})
export class PostCommentModule { }
