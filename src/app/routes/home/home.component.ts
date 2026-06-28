import {Component} from '@angular/core';
import {Card, Position} from "../../../model/Card";
import {CardsComponent} from "../../components/cards/cards.component";
import {Timeline} from "../../components/timeline/timeline";
import {TimeEntry} from "../../../model/TimeEntry";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardsComponent,
    Timeline,
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  constructor() {}

  paperCards: Card[] = [
    {
      img: "assets/card-images/msc.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.master-thesis",
      topicKey: "home.papers.uni",
      day: 23,
      month: 2,
      year: 2025,
      descriptionKey: "home.papers.master",
      link: "/assets/documents/master_thesis.pdf"
    },
    {
      img: "assets/card-images/memory.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.seminar-paper",
      topicKey: "home.papers.uni",
      day: 3,
      month: 7,
      year: 2024,
      descriptionKey: 'home.papers.seminar2',
      link: "/assets/documents/seminar_paper_2.pdf"
    },
    {
      img: "assets/card-images/bsc.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.bachelor-thesis",
      topicKey: "home.papers.uni",
      day: 7,
      month: 12,
      year: 2023,
      descriptionKey: "home.papers.bachelor",
      link: "/assets/documents/bachelor_thesis.pdf"
    },
    {
      img: "assets/card-images/async.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.seminar-paper",
      topicKey: "home.papers.uni",
      day: 24,
      month: 2,
      year: 2023,
      descriptionKey: "home.papers.seminar1",
      link: "/assets/documents/seminar_paper_1.pdf"
    },
    {
      img: "assets/card-images/pat.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.course-paper",
      topicKey: "home.papers.uni",
      day: 1,
      month: 6,
      year: 2022,
      descriptionKey: "home.papers.course",
      link: "/assets/documents/pat_paper.pdf"
    },
    {
      img: "assets/card-images/vwa.png",
      imgPosition: Position.TOP,
      titleKey: "home.papers.vwa",
      topicKey: "home.papers.school",
      day: 28,
      month: 2,
      year: 2019,
      descriptionKey: "home.papers.vwa-description",
      link: "/assets/documents/vwa.pdf"
    }
  ]
  workTimeline: TimeEntry[] = [
    {
      titleKey: "home.rzl",
      subtitleKey: "home.dev",
      monthFrom: 9,
      yearFrom: 2025,
      textKey: "home.timeline-texts.rzl"
    },
    {
      titleKey: "home.fabasoft",
      subtitleKey: "home.dev",
      monthFrom: 2,
      yearFrom: 2025,
      monthTo: 8,
      yearTo: 2025,
      textKey: "home.timeline-texts.fabasoft"
    },
    {
      titleKey: "Dynatrace",
      subtitleKey: "home.intern",
      monthFrom: 7,
      yearFrom: 2023,
      monthTo: 8,
      yearTo: 2023,
      textKey: "home.timeline-texts.dynatrace-intern"
    },
    {
      titleKey: "home.rzl",
      subtitleKey: "home.intern",
      monthFrom: 7,
      yearFrom: 2022,
      monthTo: 7,
      yearTo: 2022,
      textKey: "home.timeline-texts.rzl-intern"
    },
    {
      titleKey: "home.issw",
      subtitleKey: "home.tutor",
      monthFrom: 10,
      yearFrom: 2021,
      monthTo: 1,
      yearTo: 2025,
      textKey: "home.timeline-texts.ssw"
    },
    {
      titleKey: "home.naschmax",
      subtitleKey: "home.part-time",
      monthFrom: 9,
      yearFrom: 2017,
      monthTo: 9,
      yearTo: 2021,
      textKey : "home.timeline-texts.naschmax"
    }
  ]
  schoolTimeline: TimeEntry[] = [
    {
      titleKey: "home.jku",
      subtitleKey: "home.master",
      monthFrom: 12,
      yearFrom: 2023,
      monthTo: 4,
      yearTo: 2025,
      textKey: "home.timeline-texts.master"
    },
    {
      titleKey: "home.jku",
      subtitleKey: "home.bachelor",
      monthFrom: 3,
      yearFrom: 2020,
      monthTo: 12,
      yearTo: 2023,
    textKey: "home.timeline-texts.bachelor"
    },
    {
      titleKey: "home.borg",
      subtitleKey: "home.matura",
      monthFrom: 9,
      yearFrom: 2015,
      monthTo: 6,
      yearTo: 2019,
      textKey: "home.timeline-texts.borg"
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

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/documents/CV.pdf';
    link.download = 'cv.pdf';

    link.click();
  }
}
