import {booleanAttribute, Component, ElementRef, HostBinding, Input, numberAttribute} from '@angular/core';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',

})
export class IconComponent {
  @Input() name: string = "emoticon";
  @Input({transform: numberAttribute}) size: number;
  @Input({transform: numberAttribute}) weight: number = 400;
  @Input({transform: numberAttribute}) grade: number = 0;
  @Input({transform: booleanAttribute}) fill: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.size = parseInt(window.getComputedStyle(this.elementRef.nativeElement).fontSize);
  }

  @HostBinding('style.font-size.px') get fontSize() {
    return this.size;
  }

  @HostBinding('style.font-variation-settings') get fontVariationSettings() {
    return `'FILL' ${this.fill ? 1 : 0}, 'wght' ${this.weight}, 'GRAD' ${this.grade}, 'opsz' ${this.size}`;
  }
}
