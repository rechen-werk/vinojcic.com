import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-register',
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
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') private registerForm!: NgForm;

  protected inProgress = false;
  protected successMessage: string | null = null
  protected errorMessage: string | null = null

  constructor(private http: HttpClient) {}

  register(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.http.post(`${environment.API_BASE_URL}/admin/register`, {
        email: this.registerForm.value.email,
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
