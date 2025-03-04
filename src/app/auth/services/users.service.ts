import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environement } from "../../../environment/environment";


@Injectable()
export class UsersServices {

  public constructor (
    private readonly httpClient: HttpClient
  ) {}

  public getUsers () : Observable<User[]> {
    return this.httpClient.get<User[]>(`${environement.apiURL}/users`)
  }

  public getUser (user : number) : Observable<User> {
    return this.httpClient.get<User>(`${environement.apiURL}/${user}`)
  }

}
