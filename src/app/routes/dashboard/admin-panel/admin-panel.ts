import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FormsModule, NgForm } from "@angular/forms";
import { SubmitButton } from "../../../components/submit-button/submit-button";
import { firstValueFrom } from "rxjs";
import { NotificationService } from "../../../components/notifications/NotificationService";
import { Role } from "../../../../model/Role";
import {OkStatusMessage} from "../../../../model/OkStatusMessage";

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule, SubmitButton],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  users: { name: string, username: string, roles: string[] }[] = [];
  invitedUsers: { name: string, email: string }[] = [];
  roles: Role[] = [];
  newRoleName = '';
  draggedRole: string | null = null;

  @ViewChild('inviteForm') private inviteForm!: NgForm;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {
    this.getUsers();
    this.getInvitedUsers();
    this.getRoles();
  }

  getUsers() {
    this.http.get<{ name: string, username: string, roles: string[] }[]>(`${environment.API_BASE_URL}/admin/users/list`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.users = res;
      }
    });
  }

  getInvitedUsers() {
    this.http.get<{ name: string, email: string }[]>(`${environment.API_BASE_URL}/admin/users/list-invited`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.invitedUsers = res;
      }
    });
  }

  getRoles() {
    this.http.get<Role[]>(`${environment.API_BASE_URL}/admin/roles/list`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.roles = res;
      }
    });
  }

  inviteUserAction = async(): Promise<void> => {
    try {
      const res = await firstValueFrom(
        this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/admin/users/add`, {
          name: this.inviteForm.value.name,
          email: this.inviteForm.value.email
        }, { withCredentials: true})
      );
      this.notification.success(res.message);
      this.inviteForm.resetForm();
      this.getInvitedUsers();
    } catch (err: any) {
      this.notification.error(err.error.message);
    }
  };

  createRoleAction = async(): Promise<void> => {
    if (!this.newRoleName.trim()) {
      this.notification.info("No role name provided.");
      return;
    }
    try {
      const res = await firstValueFrom(
        this.http.post<OkStatusMessage>(`${environment.API_BASE_URL}/admin/roles/create`, this.newRoleName, { withCredentials: true })
      );
      this.notification.success(res.message);
      this.newRoleName = '';
      this.getRoles();
    } catch (err: any) {
      this.notification.error(err.error.message);
    }
  };

  deleteRole(role: Role) {
    if (!confirm(`Delete role "${role.name}"?`))
      return;

    this.http.delete<OkStatusMessage>(`${environment.API_BASE_URL}/admin/roles/${role.name}`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.notification.success(res.message);
        this.getRoles();
        this.getUsers();
      },
      error: (err) => {
        this.notification.error(err.error.message);
      }
    });
  }

  deleteUser(username: string) {
    if (!confirm(`Delete user "${username}"?`))
      return;

    this.http.delete<OkStatusMessage>(`${environment.API_BASE_URL}/admin/users/${username}`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.notification.success(res.message);
        this.getUsers();
      },
      error: (err) => {
        this.notification.error(err.error.message);
      }
    });
  }

  assignRole(username: string, role: string) {
    this.http.post(`${environment.API_BASE_URL}/admin/users/assign-role`,
      { username, role },
      { withCredentials: true }
    ).subscribe({
      next: () => { this.getUsers(); }
    });
  }

  removeRoleFromUser(username: string, role: string) {
    this.http.post(`${environment.API_BASE_URL}/admin/users/remove-role`,
      { username, role },
      { withCredentials: true }
    ).subscribe({
      next: () => { this.getUsers(); },
      error: (err) => { this.notification.error(err.error.message); }
    });
  }

  dragRole(event: DragEvent, role: string) {
    this.draggedRole = role;
    event.dataTransfer?.setData('role', role);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dropRole(event: DragEvent, username: string) {
    event.preventDefault();

    const role = event.dataTransfer?.getData('role');
    if (!role) {
      return;
    }
    this.assignRole(username, role);
  }
}
