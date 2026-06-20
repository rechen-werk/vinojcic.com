import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {RouterOutlet} from "@angular/router";
import {FooterComponent} from "./footer/footer.component";
import {Notification} from "./components/notifications/notification/notification";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../services/auth-service/user.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, Notification],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'vinojcic-com';

  protected readonly window = window;

  constructor(
    private readonly userService: UserService,
    private readonly translate: TranslateService
  ) {
    let browserLang = this.translate.getBrowserLang();
    if (!browserLang || !['en', 'de', 'hr'].includes(browserLang)) {
      browserLang = 'en';
    }
    this.translate.use(this.translate.getBrowserLang() ?? 'en');
    this.userService.user$.subscribe(cu => {
      let lang = cu?.language.toLowerCase();
      this.translate.use(lang ?? browserLang);
    });
  }
}
