import {Component, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth-service/auth.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {FormsModule, NgForm} from "@angular/forms";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-admin-panel',
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
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  users : { name: string, username: string, roles: string[] }[] = [];
  invitedUsers : { name: string, email: string }[] = [];

  @ViewChild('inviteForm') private inviteForm!: NgForm;
  protected inProgress = false;
  protected successMessage: string | null = null
  protected errorMessage: string | null = null

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router) {
    this.getUsers();
    this.getInvitedUsers();
  }

  getUsers() {
    this.http.get<{ name: string, username: string, roles: string[] }[]>(`${environment.API_BASE_URL}/admin/list-users`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.users = res;
        }
      });
  }
  getInvitedUsers() {
    this.http.get<{ name: string, email: string }[]>(`${environment.API_BASE_URL}/admin/list-invited-users`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.invitedUsers = res;
        }
      });
  }

  inviteUser(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    this.http.post(`${environment.API_BASE_URL}/admin/add-user`, {
      name: this.inviteForm.value.name,
      email: this.inviteForm.value.email,
    }, { responseType: 'text', withCredentials: true }).subscribe(
      (res) => {
        this.successMessage = res;
        this.inProgress = false;
        setTimeout(() => {
          this.successMessage = null;
        }, 5000);
        this.inProgress = false;
        this.getInvitedUsers();
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
