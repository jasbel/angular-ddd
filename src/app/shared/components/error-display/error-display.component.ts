import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styles: [],
})
export class ErrorDisplayComponent implements OnInit {
  @Input('control') control: any;
  @Input() 'field': string = '';
  @Input() classText: string = '';

  constructor() {}
  ngOnInit(): void {}
}
