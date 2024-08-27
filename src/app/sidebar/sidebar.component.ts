import { Component } from '@angular/core';
import {ControlService} from "../../services/controll-service/control.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  show!: boolean;
  constructor(private controlService: ControlService) {
    this.controlService.showSidebar$.subscribe(value => {
      this.show = value;
    });
  }
}
