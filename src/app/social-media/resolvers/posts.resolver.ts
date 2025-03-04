import { Injectable } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { Post } from "../models/post.model";
import { Observable } from "rxjs";



@Injectable()
export class PostsResolver implements Resolve<Post[]> {

  public constructor (
    private readonly postsService: PostsService
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.postsService.getPosts()
  }

}
