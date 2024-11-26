import {Component} from '@angular/core';
import {FooterComponent} from "../../footer/footer.component";
import {CardComponent} from "../../card/card.component";
import {Card, Position} from "../../../model/Card";
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
  paperCards: Card[] = [
    {
      img: 'assets/card-images/msc.png',
      imgPosition: Position.TOP,
      title: 'Master Thesis',
      topic: 'University',
      description: 'Currently I am working on my Master Thesis, in which I create an application for students. This application allows students to plan their schedule for university.',
      //link: '/master-thesis'
    },
    {
      img: 'assets/card-images/memory.png',
      imgPosition: Position.TOP,
      title: 'Seminar Paper',
      topic: 'University',
      date: '3. July 2024',
      description: 'In the course of our master studies Alexander Voglsperger and I described some ideas on Data Structure Analysis and Memory Bloat in Unmanaged Languages.',
    },
    {
      img: 'assets/card-images/bsc.png',
      imgPosition: Position.TOP,
      title: 'Bachelor Thesis',
      topic: 'University',
      date: '7 Dec. 2023',
      description: 'As my Bachelor Project I have created a Moodle manager, which downloads Homeworks from Moodle and distributes them via Discord.',
      link: '/bachelor-thesis'
    },
    {
      img: 'assets/card-images/async.png',
      imgPosition: Position.TOP,
      title: 'Seminar Paper',
      topic: 'University',
      date: '24 Feb. 2023',
      description: 'In this paper we describe an application with a few imaginary Banks and Stores, so that we can try out and compare a few solutions by working with the async/await feature in C#.'
    },
    {
      img: 'assets/card-images/pat.png',
      imgPosition: Position.TOP,
      title: 'Course Paper',
      topic: 'University',
      date: '1 Jun. 2022',
      description: 'In this paper Alexander Voglsperger and I compared a few Live Sharing tools. This work is a paper to train the process of writing, in order to write good bachelor- and master thesis later on in our university careers.'
    },
    {
      img: 'assets/card-images/vwa.png',
      imgPosition: Position.TOP,
      title: 'Pre-scientific work',
      topic: 'School',
      date: '28 Feb. 2019',
      description: 'In order to get admitted to university in austria up until 2024 it was required to write some kind of pre-scientific work. My work written in german and talks about the number pi.'
    }
  ]

  age(day: number, month: number, year: number): number {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();

    if (m < month) {
      return y - (year + 1);
    } else if (m > month) {
      return y - year;
    } else if (d < day) {
      return y - (year + 1);
    } else {
      return y - year;
    }
  }
}
