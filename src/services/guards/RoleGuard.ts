import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {UserService} from "../auth-service/user.service";
import {Injectable} from "@angular/core";
import {catchError, map, Observable, of} from "rxjs";

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredRoles = route.data as { roles: string[] };
    return this.auth.getRoles().pipe(
      map(availableRoles => requiredRoles.roles.some(requiredRole => {
        const hasRole = availableRoles.includes(requiredRole);
        if (!hasRole)
          this.router.navigate(['/dashboard']);

        return hasRole
      })),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
