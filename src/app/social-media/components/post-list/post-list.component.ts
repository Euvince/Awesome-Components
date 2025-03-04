import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { CommonModule } from '@angular/common';
import { PostListItemComponent } from "../post-list-item/post-list-item.component";
import { postCommentedType } from '../../models/postCommented.type';
import { CommentsService } from '../../../shared/services/comments.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    PostListItemComponent,

    // Tout ce qui concerne Angular Material si besoin
],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {

  public posts$!: Observable<Post[]>

  public constructor (
    private readonly activatedRoute: ActivatedRoute,
    private readonly commentsService: CommentsService
  ) {}

  public ngOnInit(): void {
    this.posts$ = this.activatedRoute.data.pipe(
      map((data) => data['posts'])
    )
  }

  public onPostCommented (postCommented : postCommentedType) : void {
    this.commentsService.testAddComment(postCommented)

  }

}
