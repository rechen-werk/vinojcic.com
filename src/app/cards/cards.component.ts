import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy
} from '@angular/core';
import {Card} from "../../model/Card";
import {CardComponent} from "./card/card.component";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'cards',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent implements AfterViewInit, OnDestroy {
  @Input({required: true}) cards!: Card[]

  constructor(
    private ref: ChangeDetectorRef,
    private elem: ElementRef
  ) { }

  private resizeObserver!: ResizeObserver;
  protected visible!: Card[];
  dots!: number[];

  cardGap = 24;

  private startX = 0;
  private startY = 0;
  private endX = 0;
  private endY = 0;

  handleSwipe(): void {
    const swipeThreshold = 50;
    const horizontal = Math.abs(this.endX - this.startX);
    const vertical = Math.abs(this.endY - this.startY);
    if (this.endX - this.startX > swipeThreshold && horizontal > 1.25 * vertical) {
      this.previousCard();
    } else if (this.startX - this.endX > swipeThreshold) {
      this.nextCard();
    }
  }

  protected nextCard() {
    this.showCards((this.cardIndex + 1) % this.dots.length);
  }

  protected previousCard() {
    this.showCards((this.cardIndex - 1 + this.dots.length) % this.dots.length);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.changedTouches[0].clientX;
    this.startY = event.changedTouches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.endX = event.changedTouches[0].clientX;
    this.endY = event.changedTouches[0].clientY;
    this.handleSwipe();
  }

  private cardIndex = 0;

  showCards(index: number) {
    const dots = document.querySelectorAll('.dot');
    dots[this.cardIndex].classList.remove('active');
    this.cardIndex = index;
    dots[this.cardIndex].classList.add('active');
    this.refreshCards();

  }

  private refreshCards() {
    const width = this.elem.nativeElement.getBoundingClientRect().width;
    const nCards = Math.max(Math.floor(width / (CardComponent.cardWidth + this.cardGap)), 1);
    this.visible = this.cards.slice(this.cardIndex, this.cardIndex + nCards);
    this.dots = Array.from(Array(this.cards.length - this.visible.length + 1).keys());
    this.ref.detectChanges();
  }

  ngAfterViewInit() {
    this.refreshCards();
    this.resizeObserver = new ResizeObserver(() => {
      this.refreshCards();
    });

    this.resizeObserver.observe(this.elem.nativeElement);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.refreshCards();
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }
}
