import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../core/models/comment.model';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    TitleCasePipe,
    DatePipe,

    ReactiveFormsModule,

    // Tout ce qui concerne Angular Material si besoin
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit {

  @Input() public comments!: Comment[]

  @Output() public newComment = new EventEmitter<string>()

  public commentCtrl!: FormControl

  public commentForm!: FormGroup


  public constructor (
    private readonly formBuilder: FormBuilder
  ) {}

  public ngOnInit(): void {
    /* this.commentCtrl = this.formBuilder.control('Nouveau commentaire', [
      Validators.required, Validators.minLength(10)
    ]) */
    this.commentForm = this.formBuilder.group({
      comment : ['Nouveau commeennttt', [
        Validators.required, Validators.minLength(10)
      ]]
    })
  }

  public onSubmitForm () : void {
    /* if (this.commentCtrl.valid) {
      console.log(this.commentCtrl.value)
    } */

    if (this.commentForm.valid) {
      // console.log(this.commentForm.value)
      this.newComment.emit(this.commentForm.value.comment)
    }
  }

}
