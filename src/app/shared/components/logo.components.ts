import { Component, Input } from '@angular/core';

@Component({
  selector: 'logo',
  template: `
    <figure [class]="type === 'in-auth' ? 'logo-in-auth' : 'logo-in-menu'">
      <img src="../../../assets/images/icons/logo.svg" />
    </figure>
  `,
  styles: [
    `
      .logo-in-menu {
        max-width: 120px;
      }
      .logo-in-auth {
        max-width: 200px;
        margin: auto;
      }
    `,
  ],
})
export class LogoComponent {
  @Input() type: 'in-menu' | 'in-auth' = 'in-menu';
  // component logic
}
