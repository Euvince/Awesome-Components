import { Comment } from "../../core/models/comment.model";


export class Post {

  public constructor (
    public id: number,
    public userId: number,
    public title: string,
    public createdDate: string,
    public imageUrl: string,
    public content: string,
    public comments: Comment[],
  ) {}

}
