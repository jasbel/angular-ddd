import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { v4 } from 'uuid';

import { ETypeTitle, TRoutePattern, TTypeForm, sId } from 'src/app/utils';
import { UserCreateModel, UserUpdateModel } from '../../models';
import { UserService } from '../../services';
import { UserES } from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    password: ['', [Validators.required]],
    cPassword: ['', [Validators.required]],
  });

  load$ = new BehaviorSubject<boolean>(false);

  dataEs = UserES;

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
    private router: Router,
    private toastr: ToastrService // private toast: ToastService
  ) {
    this.load$ = this.userService.isLoadingSubject;
  }

  ngOnInit() {
    if (this.typeForm === 'update') this.findOne();
  }

  private findOne() {
    this.itemId = (this.route.snapshot.paramMap.get('id') || '') as sId;

    if (!this.itemId) return;

    this.userService
      .findOne(this.itemId)
      .subscribe((resp) => !!resp && this.form.patchValue({ ...resp, cPassword: resp.password }));
  }

  onSubmit() {
    if (this.form.invalid) return;
    if (!this.validPassword()) return;

    if (this.typeForm === 'create') this.create();
    if (this.typeForm === 'update') this.update();
  }

  private create() {
    const data = new UserCreateModel(this.form.getRawValue());

    this.userService.create(data).subscribe({
      next: (resp) => resp && this.onReturn(),
      complete: () => {},
    });
  }

  private update() {
    const data = new UserUpdateModel(this.form.getRawValue());

    this.userService.update(data, this.form.controls.id.value).subscribe({
      next: (resp) => resp && this.onReturn(),
      complete: () => {},
    });
  }

  private validPassword() {
    const { cPassword, password } = this.form.getRawValue();

    let msg = '';
    if (password !== cPassword) msg = 'Password no coinciden';

    if (msg) this.toastr.error('Warning!', msg);

    return !msg;
  }

  onReturn = () => {
    const _link: TRoutePattern = '/users/list';
    this.router.navigate([_link]);
  };
}
