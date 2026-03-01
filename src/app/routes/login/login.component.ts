import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') private loginForm!: NgForm;

  protected inProgress = false;
  protected errorMessage: string | null = null

  constructor(
    private http: HttpClient,
    private router: Router) {
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
        this.errorMessage = err.error;
        this.inProgress = false;
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
        this.inProgress = false;
      }
    );
  }
}
