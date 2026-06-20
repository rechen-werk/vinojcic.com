import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SubmitButton} from "../../components/submit-button/submit-button";
import {firstValueFrom} from "rxjs";
import {NotificationService} from "../../components/notifications/NotificationService";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SubmitButton, TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @ViewChild('contactForm') private contactForm!: NgForm;

  constructor(
    private http: HttpClient,
    private notification: NotificationService,
    private translate: TranslateService
  ) {}

  sendAction = async (): Promise<void> => {
    try {
      await firstValueFrom(this.http.post(`${environment.API_BASE_URL}/contact`, this.contactForm.value));
      this.notification.success(this.translate.instant('contact.success-message'));
    } catch (err: any) {
      this.notification.error(this.translate.instant('contact.error-message'));
    }
  };
}
