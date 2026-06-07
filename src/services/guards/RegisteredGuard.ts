import {ActivatedRouteSnapshot, CanActivate, Router, UrlTree} from "@angular/router";
import {UserService} from "../auth-service/user.service";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of, take} from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisteredGuard implements CanActivate {

  constructor(private auth: UserService,
              private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.auth.isUserRegistered().pipe(
      take(1),
      map(registered => registered ? true : this.router.parseUrl('/not-found')),
      catchError(() => of(this.router.parseUrl('/not-found')))
    );
  }
}
