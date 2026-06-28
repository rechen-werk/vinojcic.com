import {Component, Input} from '@angular/core';
import {Card, Position} from "../../../../model/Card";
import {NgClass, NgTemplateOutlet} from "@angular/common";
import {CardsComponent} from "../cards.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'card',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass,
    TranslatePipe
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
