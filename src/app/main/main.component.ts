import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HomeComponent} from "../home/home.component";
import {NgClass} from "@angular/common";
import {ControlService} from "../../services/controll-service/control.service";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeComponent,
    NgClass
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  show!: boolean;
  constructor(private controlService: ControlService) {
    this.controlService.showSidebar$.subscribe(value => {
      this.show = value;
    });
  }
}
