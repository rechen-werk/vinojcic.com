import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../../model/User";
import {BehaviorSubject, catchError, of, tap} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.user().subscribe(user => this.userSubject.next(user));
  }

  checkInviteUUID(uuid: string) {
    return this.http.get<boolean>(
      `${environment.API_BASE_URL}/auth/check/${uuid}`,
      { withCredentials: true },
    );
  }

  logout() {
    return this.http.post<string>(
      `${environment.API_BASE_URL}/auth/logout`,
      {}, { withCredentials: true }
    ).pipe(
      tap(() => {
        this.userSubject.next(null);
      })
    );
  }

  user() {
    return this.http.get<User | null>(
      `${environment.API_BASE_URL}/auth/user`,
      { withCredentials: true }
    ).pipe(
      tap(user => this.userSubject.next(user)),
      catchError(() => {this.userSubject.next(null); return of(null);})
    );
  }

  roles() {
    return this.http.get<string[]>(
      `${environment.API_BASE_URL}/auth/me`,
      { withCredentials: true }
    );
  }

  hi() {
    return this.http.get<boolean>(
      `${environment.API_BASE_URL}/auth/hi`,
      { withCredentials: true }
    );
  }
}
