import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor (
    private readonly authService: AuthService
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders().append(
      'Authorization', `Bearer ${this.authService.getToken()}`
    )
    const modifiedReq = req.clone({ headers })
    return next.handle(modifiedReq)
  }

}
