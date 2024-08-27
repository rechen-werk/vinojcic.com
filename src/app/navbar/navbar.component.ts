import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @ViewChild('themeToggle') themeSwitch!: ElementRef<HTMLInputElement>;
  constructor() {
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
