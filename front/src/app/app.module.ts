import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';

import { TopicComponent } from './topic/topic.component';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './auth/interceptors/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { CommentViewerComponent } from './comment-viewer/comment-viewer.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatSelectModule,
  MatGridListModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
]

@NgModule({
  declarations: [
    AppComponent,
    TopicComponent,
    AuthComponent,
    UserProfilComponent,
    PostComponent,
    CommentComponent,
    CommentViewerComponent,
    PostListComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
