import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './components/topic.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TopicRoutingModule } from './topic-routing.module';



@NgModule({
  declarations: [
    TopicComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    TopicRoutingModule
  ],
  exports:[
    TopicComponent
  ]
})
export class TopicModule { }
