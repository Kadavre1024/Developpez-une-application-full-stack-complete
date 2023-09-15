import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { UnauthGuard } from './auth/guards/unauth.guard';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { TopicComponent } from './topic/topic.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    component: HomeComponent
  },
  {
    path: 'auth/:funct',
    canActivate: [UnauthGuard],
    component: AuthComponent
  },
  {
    path: 'profil',
    canActivate: [AuthGuard],
    component: UserProfilComponent
  },
  {
    path: 'topic',
    canActivate: [AuthGuard],
    component: TopicComponent
  },
  {
    path: 'post/:id',
    canActivate: [AuthGuard],
    component: PostComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
