import {Component} from '@angular/core';
import {environment} from "../../environments/environment";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  anno: number = new Date().getFullYear();
  version = environment.version;
}
