import {Component} from '@angular/core';
import {Widget} from "./widget/widget";
import {ApplicationWidget} from "../../../model/ApplicationWidget";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../services/auth-service/auth.service";
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
    private http: HttpClient,
    private auth: AuthService,
    private router: Router) {
    this.getWidgets();
  }

  getWidgets() {
    this.http.get<{name: string, path: string, icon: string}[]>(`${environment.API_BASE_URL}/app/list`, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.widgets = res;
        }
      });
  }
}
