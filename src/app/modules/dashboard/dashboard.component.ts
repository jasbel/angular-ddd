import { Component, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/core/auth';

@Component({
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  // get user() {
  //   return this.authService.currentUser();
  // }

  onLogout() {
    this.authService.logout();
  }
}
