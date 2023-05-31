import { Component, Input, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styles: [
    `
      .mat__spinner {
        max-width: 20px;
        max-height: 20px;
        display: inline-block;
      }
    `,
  ],
})
export class SpinnerComponent {
  color = 'primary'; // "accent", "warn"
  mode: ProgressSpinnerMode = 'indeterminate'; //"determinate"
  value = 100;
}
