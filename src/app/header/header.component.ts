import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "../../model/User";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../services/auth-service/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserMenuOpen = false;
  currentUser: User | null = null;

  constructor(
    private router: Router,
    protected userService: UserService,
  ) {
    if (window.self === window.top) {
      this.userService.user$.subscribe(cu => this.currentUser = cu);
    }
  }

  async clickOnLogo() {
      await this.router.navigateByUrl("/");
  }

  clickOnProfile(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  async onLogout() {
    this.userService.logout();
    this.closeUserMenu();
    await this.router.navigateByUrl("/login");
  }

  async onSettings() {
    this.closeUserMenu();
    await this.router.navigateByUrl("/settings");
  }
}
