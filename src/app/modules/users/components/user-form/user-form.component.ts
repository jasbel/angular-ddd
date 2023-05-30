import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { v4 } from 'uuid';

import {
  ERole,
  ETypeTitle,
  TRole,
  TRoutePattern,
  TTypeForm,
  enumToKeyList,
  enumToOptionList,
  sId,
} from 'src/app/utils';
import { UserCreateModel, UserUpdateModel } from '../../models';
import { UserService } from '../../services';
import { UserES } from '../../helpers';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStore } from 'src/app/core/services/local.store';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input({ required: true }) typeForm!: TTypeForm;

  form = this.formBuilder.group({
    id: [<sId>v4(), Validators.required],
    username: ['', Validators.required],
    role: [null as unknown as TRole, Validators.required],
    password: ['', [Validators.required]],
    cPassword: ['', [Validators.required]],
  });

  load$ = new BehaviorSubject<boolean>(false);
  loadRole$ = new BehaviorSubject<boolean>(false);

  dataEs = UserES;
  roles = enumToKeyList(ERole);
  roleEs = ERole;

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
    private toastr: ToastrService, // private toast: ToastService
    private localStore: LocalStore // private toast: ToastService
  ) {
    this.load$ = this.userService.isLoadingSubject;
    this.form.valueChanges.subscribe((data) => {
      console.log({ data });
      this.localStore.setItem('user', data);
    });
  }

  ngOnInit() {
    this.setCacheForm();

    if (this.typeForm === 'update') this.findOne();
  }

  private setCacheForm() {
    const _form = this.localStore.getItem('user');
    _form && this.form.patchValue(_form);
  }

  private findOne() {
    this.itemId = (this.route.snapshot.paramMap.get('id') || '') as sId;

    if (!this.itemId) return;

    // this.clearForm();

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
      next: (resp) => resp && this.processComplete(),
      complete: () => {},
    });
  }

  private update() {
    const data = new UserUpdateModel(this.form.getRawValue());

    this.userService.update(data, this.form.controls.id.value).subscribe({
      next: (resp) => resp && this.processComplete(),
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

  private processComplete() {
    this.clearForm();
    this.onReturn();
  }
  private clearForm() {
    this.localStore.clearItem('user');
    this.form.reset();
  }

  onReturn = () => {
    const _link: TRoutePattern = '/users/list';
    this.router.navigate([_link]);
  };
}
