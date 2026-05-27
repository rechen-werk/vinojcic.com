import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {SubmitButton} from "../../components/submit-button/submit-button";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, SubmitButton],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @ViewChild('contactForm') private contactForm!: NgForm;
  protected showSuccessMessage = false;
  protected showErrorMessage = false;

  constructor(private http: HttpClient) {}

  sendAction = async (): Promise<void> => {
    try {
      await firstValueFrom(this.http.post(`${environment.API_BASE_URL}/contact`, this.contactForm.value));
      this.showSuccessMessage = true;
      setTimeout(() => { this.showSuccessMessage = false; }, 5000);
    } catch (err: any) {
      this.showErrorMessage = true;
      setTimeout(() => { this.showErrorMessage = false; }, 5000);
    }
  };
}
