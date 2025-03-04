import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { CommentsService } from './services/comments.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    // CommentsService,
  ]
})
export class SharedModule { }
