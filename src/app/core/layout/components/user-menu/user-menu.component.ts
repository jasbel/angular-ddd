import { Component, inject } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent {
  private authService = inject(AuthService);

  constructor() {}

  onCloseSesion() {
    this.authService.logout();
  }
}
