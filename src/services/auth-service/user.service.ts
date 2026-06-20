import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {User} from "../../model/User";
import {BehaviorSubject, catchError, firstValueFrom, of} from "rxjs";
import {NotificationService} from "../../app/components/notifications/NotificationService";
import {OkStatusMessage} from "../../model/OkStatusMessage";

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  private readonly imageSubject = new BehaviorSubject<string | null>(null);
  readonly image$ = this.imageSubject.asObservable();

  private currentObjectUrl: string | null = null;
  private imageLoaded = false;
  private imageLoading = false;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {
    this.fetchUser();
    this.fetchImage();
  }

  logout() {
    this.http.post<string>(`${environment.API_BASE_URL}/auth/logout`, {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.userSubject.next(null);
          this.clearCachedImage();
        },
        error: () => {
          this.userSubject.next(null);
          this.clearCachedImage();
        }
      });
  }

  fetchUser() {
    this.http.get<User | null>(`${environment.API_BASE_URL}/auth/user`, { withCredentials: true })
      .subscribe({
        next: user => this.userSubject.next(user),
        error: () => this.userSubject.next(null)
      });
  }

  fetchImage() {
    if (this.imageLoaded || this.imageLoading) return;

    this.imageLoading = true;

    this.http.get(`${environment.API_BASE_URL}/auth/image`, { withCredentials: true, responseType: 'blob' })
      .pipe(catchError(() => of(null)))
      .subscribe({
        next: (blob) => {
          this.imageLoading = false;
          this.imageLoaded = true;

          if (!blob || blob.size === 0) {
            this.clearCachedImage();
            return;
          }
          this.setCachedImageFromBlob(blob);
        },
        error: () => this.imageLoading = false
      });
  }

  refreshImage() {
    this.imageLoaded = false;
    this.fetchImage();
  }

  private setCachedImageFromBlob(blob: Blob) {
    if (this.currentObjectUrl) URL.revokeObjectURL(this.currentObjectUrl);
    this.currentObjectUrl = URL.createObjectURL(blob);
    this.imageSubject.next(this.currentObjectUrl);
  }

  private clearCachedImage() {
    if (this.currentObjectUrl) URL.revokeObjectURL(this.currentObjectUrl);
    this.currentObjectUrl = null;
    this.imageSubject.next(null);
    this.imageLoaded = false;
    this.imageLoading = false;
  }


  getRoles() {
    return this.http.get<string[]>(`${environment.API_BASE_URL}/auth/me`, { withCredentials: true });
  }

  isUserRegistered() {
    return this.http.get<boolean>(`${environment.API_BASE_URL}/auth/hi`, { withCredentials: true });
  }

  checkInviteUUID(uuid: string) {
    return this.http.get<boolean>(`${environment.API_BASE_URL}/auth/check/${uuid}`, { withCredentials: true });
  }

  async updateUserSettings(user: User, updateImage: boolean, image: File | undefined) {
    try {
      const res1 = await firstValueFrom(this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/auth/update-settings`, user, {withCredentials: true}));
      let res2;
      if (updateImage) {
        if (!image) {
          return;
        }
        const form = new FormData();
        form.append('file', image!);

        res2 = await firstValueFrom(this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/auth/update-image`, form, { withCredentials: true }));
        this.refreshImage();
      }
      this.notification.success(res1.message + (res2 ? "\n"+res2.message : ""));
      this.fetchUser();
    } catch (err: any) {
      this.notification.error(err.error.message);
    }
  }

  async updatePassword(oldPassword: string, password: string) {
    try {
      const res = await firstValueFrom(this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/auth/update-password`, { oldPassword, password }, {withCredentials: true}));
      this.notification.success(res.message);
    } catch (err: any) {
      this.notification.error(err.error.message);
    }
  }
}
