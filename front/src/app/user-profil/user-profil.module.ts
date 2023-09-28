import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfilComponent } from './components/user-profil.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserProfilRoutingModule } from './user-profil-routing.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    UserProfilComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    UserProfilRoutingModule
  ],
  exports:[
    UserProfilComponent,
  ]
})
export class UserProfilModule { }
