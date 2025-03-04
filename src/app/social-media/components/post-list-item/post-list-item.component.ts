import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { CommentComponent } from "../../../shared/components/comment/comment.component";
import { postCommentedType } from '../../models/postCommented.type';
import { ShortenPipe } from '../../../shared/pipes/shorten.pipe';
import { FullnamePipe } from '../../../shared/pipes/fullname.pipe';

@Component({
  selector: 'app-post-list-item',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    TitleCasePipe,
    DatePipe,
    // ShortenPipe,
    // FullnamePipe,

    // Tout ce qui concerne Angular Material si besoin
],
  templateUrl: './post-list-item.component.html',
  styleUrl: './post-list-item.component.scss'
})
export class PostListItemComponent implements OnInit {

  @Input() public post!: Post

  @Output() public postCommented = new EventEmitter<postCommentedType>()

  public constructor () {}

  public ngOnInit(): void {}

  public onNewComment (comment : string) : void {
    // console.log(comment)
    this.postCommented.emit({ post : this.post.id, comment : comment })
  }

}
