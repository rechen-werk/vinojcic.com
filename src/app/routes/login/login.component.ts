import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";
import {SubmitButton} from "../../components/submit-button/submit-button";
import {firstValueFrom} from "rxjs";
import {NotificationService} from "../../components/notifications/NotificationService";
import {OkStatusMessage} from "../../../model/OkStatusMessage";

@Component({
  selector: 'app-login',
  imports: [FormsModule, SubmitButton],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  @ViewChild('loginForm') private loginForm!: NgForm;

  loginAction = async(): Promise<void> => {
    try {
      await firstValueFrom(
        this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/auth/login`, {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password
        }, { withCredentials: true })
      );
      await firstValueFrom(this.auth.user());
      await this.router.navigateByUrl("/dashboard");
    } catch (err: any) {
      this.notification.error(err.error.message);
    }
  };

  ngOnInit(): void {
    this.auth.hi().subscribe(
      registered => {
        if (registered) {
          this.router.navigateByUrl("/dashboard");
        }
      }
    )
  }
}
