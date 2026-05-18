import { Component } from '@angular/core';
import {Card, Position} from "../../../model/Card";
import {CardsComponent} from "../../components/cards/cards.component";
import {Timeline} from "../../components/timeline/timeline";
import {TimeEntry} from "../../../model/TimeEntry";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardsComponent,
    Timeline
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
      date: '23. February 2025',
      description: 'My Master Thesis covers a project in which I create an application for students. This application allows them to plan their schedule for the upcoming semester at JKU.',
      link: '/assets/documents/master_thesis.pdf'
    },
    {
      img: 'assets/card-images/memory.png',
      imgPosition: Position.TOP,
      title: 'Seminar Paper',
      topic: 'University',
      date: '3. July 2024',
      description: 'In the course of our master studies Alexander Voglsperger and I described some ideas on Data Structure Analysis and Memory Bloat in Unmanaged Languages.',
      link: '/assets/documents/seminar_paper_2.pdf'
    },
    {
      img: 'assets/card-images/bsc.png',
      imgPosition: Position.TOP,
      title: 'Bachelor Thesis',
      topic: 'University',
      date: '7 Dec. 2023',
      description: 'As my Bachelor Project I have created a Moodle manager, which downloads Homeworks from Moodle and distributes them via Discord.',
      link: '/assets/documents/bachelor_thesis.pdf'
    },
    {
      img: 'assets/card-images/async.png',
      imgPosition: Position.TOP,
      title: 'Seminar Paper',
      topic: 'University',
      date: '24 Feb. 2023',
      description: 'In this paper we describe an application with a few imaginary Banks and Stores, so that we can try out and compare a few solutions by working with the async/await feature in C#.',
      link: '/assets/documents/seminar_paper_1.pdf'
    },
    {
      img: 'assets/card-images/pat.png',
      imgPosition: Position.TOP,
      title: 'Course Paper',
      topic: 'University',
      date: '1 Jun. 2022',
      description: 'In this paper Alexander Voglsperger and I compared a few Live Sharing tools. This work is a paper to train the process of writing, in order to write good bachelor- and master thesis later on in our university careers.',
      link: '/assets/documents/pat_paper.pdf'
    },
    {
      img: 'assets/card-images/vwa.png',
      imgPosition: Position.TOP,
      title: 'Pre-scientific work',
      topic: 'School',
      date: '28 Feb. 2019',
      description: 'In order to get admitted to university in austria up until 2024 it was required to write some kind of pre-scientific work. My work written in german and talks about the number pi.',
      link: '/assets/documents/vwa.pdf'
    }
  ]
  workTimeline: TimeEntry[] = [
    {
      title: "RZL",
      subtitle: "(Software Developer)",
      time: "since September 2025",
      text: 'After my long journey in <a href="https://de.wikipedia.org/wiki/Linz" target="_blank">Linz</a>, studying computer science I returned to my hometown, and I am more than happy to have joined <a href="https://rzlsoftware.at/" target="_blank">RZL</a> again as a Software Developer. Here I am working with skilled people, implementing new features for the -next generation of the RZL Board in .NET and WPF.'
    },
    {
      title: "Fabasoft",
      subtitle: "(Software Developer)",
      time: "February - August 2025",
      text: 'In February I started my first real job in the role as Software Developer working full-time at <a href="https://www.fabasoft.com/en">Fabasoft</a>. I was assigned to the team Relations and worked on the internal tool sharing the same name. At this company I learned their homemade programming language app.ducx which is used to develop their cloud service.'
    },
    {
      title: "Dynatrace",
      subtitle: "(Software Developer)",
      time: "July - August 2023",
      text: 'My second, and I assume last, internship was at <a href="https://www.dynatrace.com/" target="_blank">Dynatrace</a>. Dynatrace is a big international company with roots in <a href="https://de.wikipedia.org/wiki/Linz" target="_blank">Linz</a>, which is also the location where I took my internship. I got placed in the Cloud Access Engineering team and got tasked with creating a prototype for improving their process of reviewing permissions in order to stay <a href="https://en.wikipedia.org/wiki/Sarbanes%E2%80%93Oxley_Act" target="_blank">SOX compliant</a>. My major takeaways from working at this company are a kind team, the agile scrum workflow at work, and improvements in my Spring and Kotlin skills. A negative and probably inherent takeaway is the time it takes to get something done when working corporately.'
    },
    {
      title: "RZL",
      subtitle: "(Intern)",
      time: "July 2022",
      text: 'My first internship was at <a href="https://rzlsoftware.at/" target="_blank">RZL</a>. This is a medium-sized company in the heart of the <a href="https://de.wikipedia.org/wiki/Innviertel" target="_blank">Innviertel</a>, where I come from. At RZL they tasked me to <span class="italic secondary huh" title="Essentially they helped me more than I could help them. But what is to expect of a first contact with corporate software development?">help</span> working on an internal tool which distributes their software across their servers. The people there are very kind and my mentor was always there if I had any question. The main thing I took from this internship is, how to work with git and a better knowledge about C#.'
    },
    {
      title: "Institute for System Software",
      subtitle: "(Tutor)",
      time: "October 2021 - January 2025",
      text: "As a student I quickly decided to take a tutoring job.\n" +
        "  Since I liked the lectures from <a href=\"https://www.ssw.jku.at/\" target=\"_blank\">SSW</a> best, I took the\n" +
        "  first opportunity to take a position at their institute.\n" +
        "  At this position my task changed over the years. First it was to answer Students' questions in the Tutorial\n" +
        "  for <a href=\"https://ssw.jku.at/Teaching/Lectures/SW1/VL/index.html\" target=\"_blank\">Software Development\n" +
        "  1</a>,\n" +
        "  and correct homeworks in the lectures <a href=\"https://ssw.jku.at/Teaching/Lectures/SW2/VL/index.html\"\n" +
        "  target=\"_blank\">Software Development 2</a> and later the follow up\n" +
        "  courses <a href=\"https://ssw.jku.at/Teaching/Lectures/PSW2/2024/index.html\" target=\"_blank\">Practical in\n" +
        "    Software Development 2</a> and <a href=\"https://ssw.jku.at/Teaching/Lectures/CB/VL/\" target=\"_blank\">Compiler\n" +
        "  Construction</a>."
    },
    {
      title: "Naschmax",
      subtitle: "(Part-Time)",
      time: "September 2017 - September 2021",
      text : "At <a href=\"https://www.naschmax.at/\" target=\"_blank\">Naschmax</a> I got into first contact with working at\n" +
        "  age 17.\n" +
        "  I worked here about once a week on the weekend while going to school.\n" +
        "  While being employed, my task was to sell sweets in various locations in Austria.\n" +
        "  Mainly in the upper austrian region, but sometimes we also went to bigger venues like the\n" +
        "  <a href=\"https://www.dult.at/de/\" target=\"_blank\">Dult</a> in Salzburg or the <a\n" +
        "  href=\"https://www.villacherkirchtag.at/austrias-largest-traditional-festival/\" target=\"_blank\">Kirchtag</a> in\n" +
        "  Villach.\n" +
        "  A fun event was the Linzer <a href=\"https://urfahranermarkt.com/\" target=\"_blank\">Urfix</a> which took place\n" +
        "  twice a year."
    }
  ]

  schoolTimeline: TimeEntry[] = [
    {
      title: "JKU Linz ",
      subtitle: "(Computer Science Master)",
      time: "December 2023 - April 2025",
      text: "For my masters degree I specialized in the field of Software Engineering. My masters thesis is about creating personalized semester schedules for students at JKU. I have written the tool in collaboration with the Department of Information Management and the <a href=\"https://www.ssw.jku.at/\" target=\"_blank\">Institute for System Software</a>. The thesis can be found <a href=\"/assets/documents/master_thesis.pdf\" target=\"_blank\">here</a>."
    },
    {
      title: "JKU Linz ",
      subtitle: "(Computer Science Bachelor)",
      time: "March 2020 - December 2023",
      text: "Right after school I started studying Mathematics at JKU, but quickly I realized that this topic is too dry. Immediately in the next semester I switched to studying Informatics. Life has been better since."
    },
    {
      title: "BORG Ried im Innkreis ",
      subtitle: "(Matura)",
      time: "September 2015 - June 2019",
      text: "In Austria one has to attain Matura before being admitted to University. During the time in school I got elected as a vice student representative and in our term we achieved that our school adapts some nice merch. The entire planning, and execution was done by us (kinda proud of that one). The end of this time was awarded with an diploma with excellence."
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
