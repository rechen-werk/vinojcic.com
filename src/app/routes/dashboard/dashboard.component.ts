import {Component} from '@angular/core';
import {Widget} from "./widget/widget";
import {ApplicationWidget} from "../../../model/ApplicationWidget";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../services/auth-service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [
    Widget,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  widgets : ApplicationWidget[] = [];
  constructor(
    private http: HttpClient) {
    this.getWidgets();
  }

  getWidgets() {
    this.http.get<ApplicationWidget[]>(`${environment.API_BASE_URL}/app/list`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.widgets = res;
        }
      });
  }
}
