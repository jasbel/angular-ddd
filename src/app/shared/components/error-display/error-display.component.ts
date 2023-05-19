import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styles: [],
})
export class ErrorDisplayComponent implements OnInit {
  // @Input() br: boolean = false;
  @Input('control') control: any;
  @Input() 'field': string = '';
  @Input() classText: string = '';

  constructor() {}
  ngOnInit(): void {}
}
