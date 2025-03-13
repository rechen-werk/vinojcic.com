import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-crop',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
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
  templateUrl: './crop.component.html',
  styleUrl: './crop.component.scss'
})
export class CropComponent {
  @ViewChild('cropForm') private cropForm!: NgForm;
  protected showErrorMessage = false;
  protected cropLink!: string;
  protected inProgress = false;

  constructor(private http: HttpClient) {}

  cropMeme(event: SubmitEvent) {
    event.preventDefault();
    if(this.cropLink) {
      this.inProgress = true;
      this.http.get(`${environment.API_BASE_URL}/crop?crop=${encodeURIComponent(this.cropLink)}`, { responseType: 'blob'}).subscribe(
        response => {
          const url = window.URL.createObjectURL(response);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'crop-meme.png';  // Set desired file name
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);  // Clean up
          this.showErrorMessage = false;
          this.inProgress = false;
        },
        error => {
          this.showErrorMessage = true;
          this.inProgress = false;
          console.log(error);
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      );
    } else {
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000);
    }
  }
}
