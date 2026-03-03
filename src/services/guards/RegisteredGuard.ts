import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class RegisteredGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  canActivate(_route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.hi().pipe(
      map(registered => {
        if (registered) {
          return true;
        } else {
          this.router.navigateByUrl('/login');
          return false;
        }
      })
    )
  }
}
