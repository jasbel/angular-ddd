import { Component, OnInit, computed, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth';

interface IDashboard {
  id: string;
  name: string;
}
type KTDashboard = keyof IDashboard;
type SKTDashboard = { [key in KTDashboard]: string };

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css'],
})
export class DashboardMainComponent implements OnInit {
  private authService = inject(AuthService);

  public user = computed(() => this.authService.currentUser());

  // get user() {
  //   return this.authService.currentUser();
  // }

  columns: KTDashboard[] = ['id', 'name'];
  columnEs: SKTDashboard = { id: 'Id', name: 'Nombre' };
  data: IDashboard[] = [{ id: 'Id0', name: 'Nombre0' }];
  loading$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.loading$.next(true);
    setTimeout(() => {
      this.data = [
        { id: 'Id2', name: 'Nombre2' },
        { id: 'Id3', name: 'Nombre3' },
        { id: 'Id4', name: 'Nombre4' },
        { id: 'Id10', name: 'Nombre10' },
        { id: 'Id11', name: 'Nombre11' },
        { id: 'Id12', name: 'Nombre12' },
        { id: 'Id13', name: 'Nombre13' },
        { id: 'Id14', name: 'Nombre14' },
      ];

      console.log(this.data);
      this.loading$.next(false);
    }, 5000);
  }

  onLogout() {
    this.authService.logout();
  }
}
