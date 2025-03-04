import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {

  public constructor (
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.getToken()) {
      return true
    }
    else {
      this.router.navigateByUrl('social-media')
      return false
    }
  }

}
