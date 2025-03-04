import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environement } from "../../../environment/environment";
import { Comment } from "../../core/models/comment.model";



@Injectable({
  providedIn : 'root'
})
export class CommentsService {

  public constructor (
    private readonly httpClient: HttpClient
  ) {}

  public getComments () : Observable<Comment[]> {
    return this.httpClient.get<Comment[]>(`${environement.apiURL}/posts`)
  }

  public getComment (comment : number) : Observable<Comment> {
    return this.httpClient.get<Comment>(`${environement.apiURL}/${comment}`)
  }

  public addComment (post : number, formvalue: { comment: string }) : Observable<Comment> {
    return this.httpClient.post<Comment>(`${environement.apiURL}/posts/${post}/comment`, formvalue)
  }

  public testAddComment (data : { post : number, comment : string }) : void {
    console.log(data)
  }

}
