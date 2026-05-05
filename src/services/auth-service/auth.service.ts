import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient) {}

  checkInviteUUID(uuid: string) {
    return this.http.get<boolean>(
      `${environment.API_BASE_URL}/auth/check-invite-uuid`,
      { withCredentials: true, params: { uuid: uuid } },
    );
  }

  me() {
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
