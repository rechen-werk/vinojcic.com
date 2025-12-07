import {Component} from '@angular/core';
import {Widget} from "./widget/widget";
import {ApplicationWidget} from "../../../model/ApplicationWidget";

@Component({
  selector: 'app-dashboard',
  imports: [
    Widget,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly widgets :ApplicationWidget[] = [];
  constructor() { }
}
