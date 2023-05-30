import { Component, Input } from '@angular/core';

@Component({
  selector: 'select-control',
  template: `
    <div class="mb-5 form__input--100">
      <div class="select-wrap label-top--light">
        <!-- <label>{{ label }}</label> -->
        <span class="form__label--100">{{ label }}</span>
        <ng-content></ng-content>
        <span class="form__input--focus"></span>
      </div>
    </div>
  `,
  styles: [],
})
export class SelectControlComponent {
  @Input({ required: true }) label = '';
}
