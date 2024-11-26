import {Component, Input} from '@angular/core';
import {Card, Position} from "../../model/Card";
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({required: true}) card!: Card;
  protected readonly Position = Position;
}
