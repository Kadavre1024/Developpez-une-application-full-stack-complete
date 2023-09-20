import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guards/auth.guard";
import { UserProfilComponent } from "./components/user-profil.component";



const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: UserProfilComponent
    }
  ];

@NgModule({
    imports:[ RouterModule.forChild(routes) ],
    exports:[ RouterModule ]
})
export class UserProfilRoutingModule {}