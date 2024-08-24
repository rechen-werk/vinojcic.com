import { Component } from '@angular/core';
import {SidebarComponent} from "../sidebar/sidebar.component";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SidebarComponent,
    HomeComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
