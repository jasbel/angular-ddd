import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { v4 } from 'uuid';

import { ETypeTitle, TRoutePattern, TTypeForm, sId } from 'src/app/utils';
import { UserCreateModel, UserUpdateModel } from '../../models';
import { UserService } from '../../services';
import { UserES } from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input({ required: true }) typeForm!: TTypeForm;

  form = this.formBuilder.group({
    id: [<sId>v4(), Validators.required],
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.email]],
    cPassword: ['', [Validators.required, Validators.email]],
  });

  dataEs = UserES;

  submitted = false;

  itemId: sId | null = null;

  get title() {
    return ETypeTitle[this.typeForm] + ' Usuario';
  }

  get f() {
    return this.form.controls;
  }

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.typeForm === 'update') this.findOne();
  }

  private findOne() {
    this.itemId = (this.route.snapshot.paramMap.get('id') || '') as sId;

    if (!this.itemId) return;

    this.userService.findOne(this.itemId).subscribe((resp) => !!resp && this.form.patchValue({ ...resp }));
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    if (this.typeForm === 'create') this.create();
    if (this.typeForm === 'update') this.update();
  }

  private create() {
    const data = new UserCreateModel(this.form.getRawValue());

    this.userService.create(data).subscribe({
      next: (resp) => {
        console.log('Usuario creado con éxito');
        this.form.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
      },
    });
  }

  private update() {
    const data = new UserUpdateModel(this.form.getRawValue());

    this.userService.update(data, this.form.controls.id.value).subscribe({
      next: (resp) => {
        console.log('Usuario actualizado con éxito');
        this.form.reset();
        this.submitted = false;
      },
      error: (error) => {
        console.error('Error al crear el usuario', error);
      },
    });
  }

  onReturn = () => {
    const _link: TRoutePattern = '/users/list';
    this.router.navigate([_link]);
  };
}
