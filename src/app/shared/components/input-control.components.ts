import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-control',
  template: `
    <div class="mb-5 form__input--100">
      <span class="form__label--100">{{ label }}</span>
      <ng-content></ng-content>
      <span class="form__input--focus"></span>
    </div>
  `,
  styles: [],
})
export class InputControlComponent {
  @Input({ required: true }) label = '';
}
