import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BgColorByStatus, notyStatus, StatusCode, TModelNameEs } from 'src/app/utils';

export type TTypeShow = boolean; /* | 'template-string' */

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  constructor(private toastr: ToastrService) {}

  show(textOrTpl: string | TemplateRef<any>, options: any = {}, isError?: TTypeShow) {
    this.toasts.push({ textOrTpl, ...options, isError });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showInfo(message: string) {
    this.show(message, {
      classname: 'bg-info text-white fs-6',
      delay: 3000,
    });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);

  }

  clear() {
    this.toasts.splice(0, this.toasts.length);
  }

  // Defaults
  showSuccess(message: string) {
    this.show(message, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
    });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showByStatusModel(statusCode: StatusCode, model: TModelNameEs = '') {
    if (!statusCode && !notyStatus[statusCode]) return;

    const msg = notyStatus[statusCode] || ' ';

    const bgColor = BgColorByStatus[statusCode] || 'bg-warning';

    this.show(`${model} ${msg}`, {
      classname: bgColor + ' text-white fs-6',
      delay: 5000,
    });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  created(model: TModelNameEs) {
    this.show(`${model} ${notyStatus[StatusCode.created]}`, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
    });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  updated(model: TModelNameEs) {
    this.show(`${model} ${notyStatus[StatusCode.updated]}`, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
    });

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showDanger(dangerTpl: string | TemplateRef<any>) {
    this.show(dangerTpl, { classname: 'bg-danger text-white fs-6', delay: 12000 }, true);

    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showDangerServer(dangerTpl: string | TemplateRef<any>) {
    this.show(dangerTpl, { classname: 'bg-danger text-white fs-6', delay: 20000 }, true);

    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
