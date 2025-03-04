import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { catchError, delay, map, mapTo, Observable, of, switchMap, tap } from "rxjs"
import { Register } from "../../auth/models/register.model"
import { environement } from "../../../environment/environment"
import { User } from "../../auth/models/user.model"
import { UsersServices } from "../../auth/services/users.service"


@Injectable()
export class AuthService {

  public constructor (
    private readonly httpClient: HttpClient,
    private readonly usersService: UsersServices
  ) {}

  private realToken!: string
  private fakeToken!: string


  public testRegister (formvalue : Register) : Observable<boolean | Error> {
    return this.httpClient.post<boolean>(`${environement.apiURL}/register`, formvalue).pipe(
      mapTo(true),
      delay(1000),
      /* tap(() => {
        console.log(formvalue)
      }), */
      catchError((error) => {
        return of(false).pipe(
          delay(1000)
        )
        // return error
      })
    )
  }

  public testLogin () : void {
    this.fakeToken = "MyFakeToken"
  }

  public register (formValue : Register) : Observable<User> {
    return this.usersService.getUsers().pipe(
      map((users) => users.sort((a, b) => a.id - b.id)),
      map((sortedUsers) => sortedUsers[sortedUsers.length - 1]),
      map((previousUser) => ({
        ...formValue,
        id : previousUser.id + 1,
      })),
      switchMap(() =>
        this.httpClient.post<User>(`${environement.apiURL}/register`, formValue)
      )
    )
  }

  public login (formValue : { email : string, password : string }) : Observable<User> {
    return this.httpClient.post<User>(`${environement.apiURL}/login`, formValue)
  }

  public getToken () : string {
    return this.fakeToken
  }

}
