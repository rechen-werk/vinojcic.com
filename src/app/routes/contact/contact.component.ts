import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  @ViewChild('contactForm') private contactForm!: NgForm;

  constructor(private http: HttpClient) {
  }


  send(event: SubmitEvent) {
    event.preventDefault();
    this.http.post('https://vinojcic.com/contact', this.contactForm.value).subscribe(
      (response) => {
        console.log("SENT")
      },
      (error) => {
        console.log("NOT SENT")

      }
    );
  }
}
