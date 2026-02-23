import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') private loginForm!: NgForm;

  protected inProgress = false;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  goToRegister() {
    this.router.navigateByUrl("/register");
  }

  login(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    this.http.post(`${environment.API_BASE_URL}/auth/login`, {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }, { responseType: 'text', withCredentials: true }).subscribe(
      () => {
        this.router.navigateByUrl("/dashboard");
      },
      (err) => {
        this.inProgress = false;
      }
    );
  }
}
