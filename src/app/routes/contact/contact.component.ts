import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgClass
  ],
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
  protected inProgress = false;

  constructor(private http: HttpClient) {}

  send(event: SubmitEvent) {
    event.preventDefault();
    this.inProgress = true;
    this.http.post(`${environment.API_BASE_URL}/contact`, this.contactForm.value).subscribe(
      () => {
        this.showSuccessMessage = true;
        this.inProgress = false;
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 2000);
      },
      () => {
        this.showErrorMessage = true;
        this.inProgress = false;
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 3000);
      }
    );
  }
}
