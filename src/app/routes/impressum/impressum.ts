import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-impressum',
  imports: [
    TranslatePipe
  ],
  templateUrl: './impressum.html',
  styleUrl: './impressum.scss',
})
export class Impressum {}
