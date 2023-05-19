import { Component } from '@angular/core';

@Component({
  selector: 'submit-control',
  template: `
    <div class="form__btn-container">
      <div class="form__btn-content">
        <div class="form__btn-bg"></div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [],
})
export class SubmitControlComponent {}
