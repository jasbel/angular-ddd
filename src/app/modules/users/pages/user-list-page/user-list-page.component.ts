import { Component, OnInit } from '@angular/core';
import { UserService } from '../../domain/services/user.service';
import { User } from '../../domain/models/user.model';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
})
export class UserListPageComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error al cargar los usuarios', error);
      },
    });
  }
}