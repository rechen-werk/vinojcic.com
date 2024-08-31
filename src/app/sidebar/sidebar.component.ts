import { Component } from '@angular/core';
import {IconComponent} from "../../lib/icon/icon.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    IconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
}
