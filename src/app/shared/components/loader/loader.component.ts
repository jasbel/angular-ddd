import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  @Input() hidden: boolean = false;
  @Input() title: string = 'Cargando';

  constructor() {}

  ngOnInit(): void {}
}
