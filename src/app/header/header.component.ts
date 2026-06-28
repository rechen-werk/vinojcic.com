import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {User} from "../../model/User";
import {AsyncPipe, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../services/auth-service/user.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Language} from "../../model/Language";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    AsyncPipe,
    TranslatePipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isUserMenuOpen = false;
  currentUser: User | null = null;
  loggedOutLanguage: Language;

  constructor(
    private router: Router,
    protected userService: UserService,
    private readonly translate: TranslateService
  ) {
    if (window.self === window.top) {
      this.userService.user$.subscribe(cu => this.currentUser = cu);
    }
    this.loggedOutLanguage = (localStorage.getItem('lang') ?? this.translate.getBrowserLang() ?? 'EN').toUpperCase() as Language;
  }

  async clickOnLogo() {
      await this.router.navigateByUrl("/");
  }

  toggleUserManu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu(): void {
    this.isUserMenuOpen = false;
  }

  async onLogout() {
    this.userService.logout();
    this.setLanguage(this.loggedOutLanguage)
    await this.router.navigateByUrl("/");
  }

  async onSettings() {
    this.closeUserMenu();
    await this.router.navigateByUrl("/settings");
  }

  setLanguage(language: string): void {
    if (!language) return;
    console.log(language);
    this.closeUserMenu();
    const lang = language.toLowerCase()
    this.translate.use(lang);
    this.loggedOutLanguage = language as Language;
    localStorage.setItem('lang', lang);
  }

}
