import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth-service/auth.service";

@Component({
  selector: 'app-register',
  imports: [ FormsModule ],
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
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') private registerForm!: NgForm;

  protected inProgress = false;
  protected successMessage: string | null = null
  protected errorMessage: string | null = null

  protected uuid: string | null = null;
  protected name: string | null = null;
  protected email: string | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly auth: AuthService,
    ) {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.getInvitation();
  }

  getInvitation() {
    this.http.get<{ name: string, email: string }>(`${environment.API_BASE_URL}/auth/get-invitation/${this.uuid}`)
      .subscribe({
        next: (res) => {
          this.name = res.name;
          this.email = res.email;
        }
      });
  }

  register(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.http.post(`${environment.API_BASE_URL}/auth/register`, {
        uuid: this.uuid,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }, { responseType: 'text', withCredentials: true }).subscribe(
        (res) => {
          this.successMessage = res;
          this.inProgress = false;
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
          this.inProgress = false;
          this.auth.user().subscribe();
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
    } else {
      this.inProgress = false;
    }
  }
}
