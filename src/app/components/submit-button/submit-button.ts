import {Component, Input} from '@angular/core';

@Component({
  selector: 'submit-button',
  imports: [],
  templateUrl: './submit-button.html',
  styleUrl: './submit-button.scss',
})
export class SubmitButton {
  inProgress = false;
  @Input({required: true}) text!: string;
  @Input({required: true}) action!: () => Promise<void>;

  async run() {
    if (this.inProgress) return;
    this.inProgress = true;
    try {
      await this.action().then()
    } finally {
      this.inProgress = false;
    }
  }
}
