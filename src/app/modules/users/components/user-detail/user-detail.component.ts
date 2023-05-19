import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../domain/services/user.service';
import { User, UserClass } from '../../domain/models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
})
export class UserDetailComponent implements OnInit {
  userId: number = 0;
  user: User = new UserClass();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(this.userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error('Error al cargar el usuario', error);
      }
    );
  }
}
