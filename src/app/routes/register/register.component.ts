import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss'
})
export class RegisterComponent {
  @ViewChild('registerForm') private registerForm!: NgForm;

  protected inProgress = false;

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  register(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword) {
      this.http.post(`${environment.API_BASE_URL}/auth/register`, {
        email: this.registerForm.value.email,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password
      }, { responseType: 'text', withCredentials: true }).subscribe(
        () => {
          this.router.navigateByUrl("/dashboard");
        },
        () => {
          this.inProgress = false;
        }
      );
    } else {
      this.inProgress = false;
    }
  }
}
