import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthGuard } from './core/guards/unauth.guard';

import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [UnauthGuard],
    component: HomeComponent
  },
  {
    path: 'auth',
    canActivate: [UnauthGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'profil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user-profil/user-profil.module').then(m => m.UserProfilModule)
  },
  {
    path: 'topic',
    canActivate: [AuthGuard],
    loadChildren: () => import('./topic/topic.module').then(m => m.TopicModule)
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
    loadChildren: () => import('./post-comment/post-comment.module').then(m => m.PostCommentModule)
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
