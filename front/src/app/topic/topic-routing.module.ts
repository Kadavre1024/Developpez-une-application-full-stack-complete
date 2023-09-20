import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { TopicComponent } from "./components/topic.component";



const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: TopicComponent
    }
  ];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports:[ RouterModule ]
})
export class TopicRoutingModule {}