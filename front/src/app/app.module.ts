import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { UserProfilModule } from './user-profil/user-profil.module';
import { TopicModule } from './topic/topic.module';
import { AuthModule } from './auth/auth.module';
import { PostCommentModule } from './post-comment/post-comment.module';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatGridListModule,
  MatMenuModule,
  MatListModule,
  MatSidenavModule,
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, 
    CommonModule,
    CoreModule,
    ...materialModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
