import {Component} from '@angular/core';
import {FooterComponent} from "../footer/footer.component";
import {CardComponent} from "../card/card.component";
import {Card, Position} from "../../model/Card";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    CardComponent,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  thesisCards: Card[] = [
    {
      img: 'assets/card-images/bsc.png',
      imgPosition: Position.TOP,
      title: 'Bachelor Thesis',
      description: 'As my Bachelor Project I have created a Moodle manager, which downloads Homeworks from Moodle and distributes them via Discord.',
      link: '/bachelor-thesis'
    }
  ]
  paperCards: Card[] = [
    {
      img: 'bar',
      imgPosition: Position.BOTTOM,
      title: 'Paper1',
      description: 'Paper 1 desc.'
    },
    {
      img: 'bar',
      imgPosition: Position.TOP,
      title: 'Paper2',
      description: 'Paper 2 desc.'
    }
  ]
}
