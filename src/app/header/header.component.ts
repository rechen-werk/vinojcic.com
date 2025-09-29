import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private clickCount = 0;
  private timer: number | null = null;
  private timer2: number | null = null;

  constructor(private router: Router) {
  }

  clickOnLogo() {
    this.clickCount++;
    if (this.clickCount == 1) {
      this.timer = window.setTimeout(() => {
        this.clickCount = 0;
        this.timer = null;
      }, 2000);
    }

    if (this.clickCount >= 5) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.clickCount = 0;
      this.timer = null;

      this.timer2 = window.setTimeout(() => {
        this.timer2 = null;
      }, 1000);

      this.router.navigateByUrl("/login");
    } else if (this.router.url != "/login") {
      this.router.navigateByUrl("/");
    } else if (this.timer2 == null) {
      this.router.navigateByUrl("/");
      this.clickCount = 0;
    }
  }
}
