import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { PostFormComponent } from "./components/post-form/post-form.component";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostComponent } from "./components/post/post.component";


const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: PostListComponent
    },
    {
        path: 'create',
        canActivate: [AuthGuard],
        component: PostFormComponent
    },
    {
        path: ':id',
        canActivate: [AuthGuard],
        component: PostComponent
    },
  
    
];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports:[ RouterModule ]
})
export class PostRoutingModule {}