import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "../auth-service/auth.service";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class UUIDGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const params = route.queryParams as { uuid: string };
    return this.auth.checkInviteUUID(params.uuid).pipe(
      map(valid => {
        if (!valid) {
          this.router.navigate(['']);
        }
        return valid;
      }),
      catchError(() => {
        this.router.navigate(['']);
        return of(false);
      })
    );
  }
}
