import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../services/auth-service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-panel',
  imports: [],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router) { }
}
