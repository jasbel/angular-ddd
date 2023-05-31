import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styles: [
    `
      .a-loader {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        gap: 6px;
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  @Input() container: boolean = false;
  @Input() hidden: boolean = false;
  @Input() title: string = 'Cargando';

  constructor() {}

  ngOnInit(): void {}
}
