import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  submitted = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userForm;
  }

  get formControls() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    const user = {
      id: Math.random(),
      firstName: this.formControls.firstName.value!,
      lastName: this.formControls.lastName.value!,
      email: this.formControls.email.value!,
    };

    this.userService.createUser(user).subscribe({
      next: (response) => {
        // Aquí puedes manejar la respuesta del servidor o realizar acciones adicionales después de crear el usuario
        console.log('Usuario creado con éxito');
        this.userForm.reset();
        this.submitted = false;
      },
      error: (error) => {
        // Aquí puedes manejar el error en caso de que la creación del usuario falle
        console.error('Error al crear el usuario', error);
      },
    });
  }
}
