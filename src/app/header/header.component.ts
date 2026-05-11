import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "../../model/User";
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private clickCount = 0;
  private timer: number | null = null;
  private timer2: number | null = null;

  isUserMenuOpen = false;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
    if (window.self === window.top) {
      this.auth.user$.subscribe(cu => this.currentUser = cu);
    }
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
      }, 2000);

      this.router.navigateByUrl("/login");
    } else if (this.router.url != "/login" && this.router.url != "/dashboard") {
      this.router.navigateByUrl("/");
    } else if (this.timer2 == null) {
      this.router.navigateByUrl("/");
      this.clickCount = 0;
    }
  }

  clickOnProfile(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  onLogout(): void {
    this.auth.logout().subscribe();
    this.closeUserMenu();
    this.router.navigateByUrl("/login");
  }
}
