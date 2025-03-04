import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post.model";
import { environement } from "../../../environment/environment";



@Injectable()
export class PostsService {

  public constructor (
    private readonly httpClient: HttpClient
  ) {}

  public getPosts () : Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${environement.apiURL}/posts`)
  }

  public getPost (post : number) : Observable<Post> {
    return this.httpClient.get<Post>(`${environement.apiURL}/${post}`)
  }

}
