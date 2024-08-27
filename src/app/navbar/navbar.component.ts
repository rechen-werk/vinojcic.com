import {Component, ElementRef, ViewChild} from '@angular/core';
import {ControlService} from "../../services/controll-service/control.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('themeToggle') themeSwitch!: ElementRef<HTMLInputElement>;
  constructor(private controlService: ControlService) {}
  toggleSidebar() {
    this.controlService.toggleSidebar();
  }
  toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    const dark = 'dark'
    const light = 'light'
    const add = isDark ? light : dark;
    const remove = isDark ? dark : light;

    document.documentElement.classList.remove(remove);
    document.documentElement.classList.add(add);
  }
}
