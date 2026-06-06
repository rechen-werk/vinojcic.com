import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SubmitButton} from "../../components/submit-button/submit-button";
import {firstValueFrom} from "rxjs";
import {NotificationService} from "../../components/notifications/NotificationService";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SubmitButton],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @ViewChild('contactForm') private contactForm!: NgForm;

  constructor(
    private http: HttpClient,
    private notification: NotificationService
  ) {}

  sendAction = async (): Promise<void> => {
    try {
      await firstValueFrom(this.http.post(`${environment.API_BASE_URL}/contact`, this.contactForm.value));
      this.notification.success('Thank you for your message! We will get back to you shortly.');
    } catch (err: any) {
      this.notification.error('Oops, something went wrong. Please try again later.');
    }
  };
}
