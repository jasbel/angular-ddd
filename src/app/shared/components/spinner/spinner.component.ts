import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit {
  @Input() hidden: boolean = false;
  @Input() visible: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
