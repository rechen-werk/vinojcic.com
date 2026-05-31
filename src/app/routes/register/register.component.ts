import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {SubmitButton} from "../../components/submit-button/submit-button";
import {firstValueFrom} from "rxjs";
import {NotificationService} from "../../components/notifications/NotificationService";

@Component({
  selector: 'app-register',
  imports: [FormsModule, SubmitButton],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss'
})
export class RegisterComponent {
  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    private readonly notification: NotificationService
    ) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.getInvitation();
  }

  @ViewChild('registerForm') private registerForm!: NgForm;
  protected uuid: string | null = null;
  protected name: string | null = null;
  protected email: string | null = null;

  getInvitation() {
    this.http.get<{ name: string, email: string }>(`${environment.API_BASE_URL}/auth/get-invitation/${this.uuid}`)
      .subscribe({
        next: (res) => {
          this.name = res.name;
          this.email = res.email;
        }
      });
  }

  registerAction = async (): Promise<void> => {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.notification.warning('Passwörter stimmen nicht überein')
      return;
    }
    try {
      const msg = await firstValueFrom(
        this.http.post(`${environment.API_BASE_URL}/auth/register`, {
          uuid: this.uuid,
          username: this.registerForm.value.username,
          password: this.registerForm.value.password
        }, {responseType: 'text', withCredentials: true})
      );
      await firstValueFrom(this.auth.user());
      this.notification.success(msg);
    } catch (err: any) {
      this.notification.error(err.message);
    }
  };
}
