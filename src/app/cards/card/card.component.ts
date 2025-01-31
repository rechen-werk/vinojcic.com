import {Component, Input} from '@angular/core';
import {Card, Position} from "../../../model/Card";
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {CardsComponent} from "../cards.component";

@Component({
  selector: 'card',
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
  static cardWidth = 300;
  cardWidth = 300;
  static cardHeight = 450;
  cardHeight = 450;
  protected readonly CardsComponent = CardsComponent;

}
