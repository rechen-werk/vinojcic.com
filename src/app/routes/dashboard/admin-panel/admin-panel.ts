import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { FormsModule, NgForm } from "@angular/forms";
import { SubmitButton } from "../../../components/submit-button/submit-button";
import { firstValueFrom } from "rxjs";
import { NotificationService } from "../../../components/notifications/NotificationService";

@Component({
  selector: 'app-admin-panel',
  imports: [FormsModule, SubmitButton],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  users: { name: string, username: string, roles: string[] }[] = [];
  invitedUsers: { name: string, email: string }[] = [];
  roles: { name: string }[] = [];
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
    this.http.get<{ name: string, username: string, roles: string[] }[]>(
      `${environment.API_BASE_URL}/admin/list-users`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.users = res;
      }
    });
  }

  getInvitedUsers() {
    this.http.get<{ name: string, email: string }[]>(
      `${environment.API_BASE_URL}/admin/list-invited-users`,
      { withCredentials: true }
    ).subscribe({
      next: (res) => {
        this.invitedUsers = res;
      }
    });
  }

  getRoles() {
    this.http.get<{ name: string }[]>(
      `${environment.API_BASE_URL}/admin/list-roles`,
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
        this.http.post(`${environment.API_BASE_URL}/admin/add-user`, {
          name: this.inviteForm.value.name,
          email: this.inviteForm.value.email
        }, {responseType: 'text', withCredentials: true})
      );
      this.notification.success(res);
      this.inviteForm.resetForm();
      this.getInvitedUsers();
    } catch (err: any) {
      this.notification.error(err.message);
    }
  };

  createRole() {
    if (!this.newRoleName.trim()) {
      return;
    }

    this.http.post(
      `${environment.API_BASE_URL}/admin/create-role`,
      { role: this.newRoleName },
      {
        responseType: 'text',
        withCredentials: true
      }
    ).subscribe({
      next: (res) => {
        this.notification.success(res);
        this.newRoleName = '';
        this.getRoles();
      },
      error: (err) => {
        this.notification.error(err.message);
      }
    });
  }

  deleteRole(role: string) {
    if (!confirm(`Delete role "${role}"?`)) {
      return;
    }

    this.http.delete(
      `${environment.API_BASE_URL}/admin/delete-role/${role}`,
      {
        responseType: 'text',
        withCredentials: true
      }
    ).subscribe({
      next: (res) => {
        this.notification.success(res);
        this.getRoles();
        this.getUsers();
      },
      error: (err) => {
        this.notification.error(err.message);
      }
    });
  }

  deleteUser(username: string) {

    if (!confirm(`Delete user "${username}"?`)) {
      return;
    }

    this.http.delete(
      `${environment.API_BASE_URL}/admin/delete-user/${username}`,
      {
        responseType: 'text',
        withCredentials: true
      }
    ).subscribe({
      next: (res) => {
        this.notification.success(res);
        this.getUsers();
      },
      error: (err) => {
        this.notification.error(err.message);
      }
    });
  }

  assignRole(username: string, role: string) {
    this.http.post(`${environment.API_BASE_URL}/admin/assign-role`,
      { username, role},
      { responseType: 'text', withCredentials: true }
    ).subscribe({
      next: () => { this.getUsers(); }
    });
  }

  removeRoleFromUser(username: string, role: string) {
    this.http.post(
      `${environment.API_BASE_URL}/admin/remove-role`,
      { username, role },
      { responseType: 'text', withCredentials: true }
    ).subscribe({
      next: () => { this.getUsers(); }
    });
  }

  dragRole(event: DragEvent, role: string, username: string) {
    this.draggedRole = role;

    event.dataTransfer?.setData('role', role);
    event.dataTransfer?.setData('username', username);
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  dropRole(event: DragEvent, username: string, assign: boolean) {
    event.preventDefault();

    const role = event.dataTransfer?.getData('role');
    if (!role) {
      return;
    }

    if (assign) {
      this.assignRole(username, role);
    } else {
      this.removeRoleFromUser(username, role);
    }
  }

  getAvailableRoles(userRoles: string[]) {
    return this.roles.filter(
      role => !userRoles.includes(role.name)
    );
  }
}
