import { Injectable, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BgColorByStatus, notyStatus, StatusCode, TModelNameEs } from 'src/app/utils';

interface IToast {
  isError?: boolean;
  classname?: string;
  delay?: number;
  textOrTpl?: string;
  title?: string;
}

interface IOption extends Pick<IToast, 'classname' | 'delay' | 'title' | 'isError'> {}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toasts: IToast[] = [];

  constructor(/* private toastr: ToastrService */) {}

  private show(textOrTpl: string, options: IOption = {}) {
    // this.toasts.push({ textOrTpl, ...options });

    // this.toastr.success(textOrTpl, options.title || '');
  }

  showInfo(message: string) {
    this.show(message, {
      classname: 'bg-info text-white fs-6',
      delay: 3000,
      title: 'info',
    });
  }

  showSuccess(message: string) {
    this.show(message, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
      title: 'Success',
    });
  }

  showByStatusModel(statusCode: StatusCode, model: TModelNameEs = '') {
    if (!statusCode && !notyStatus[statusCode]) return;

    const msg = notyStatus[statusCode] || ' ';

    const bgColor = BgColorByStatus[statusCode] || 'bg-warning';

    this.show(`${model} ${msg}`, {
      classname: bgColor + ' text-white fs-6',
      delay: 5000,
      title: 'Modelo',
    });
  }

  created(model: TModelNameEs) {
    this.show(`${model} ${notyStatus[StatusCode.created]}`, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
      title: 'Creado',
    });
  }

  updated(model: TModelNameEs) {
    this.show(`${model} ${notyStatus[StatusCode.updated]}`, {
      classname: 'bg-success text-white fs-6',
      delay: 5000,
      title: 'Actualizado',
    });
  }

  showDanger(textOrTpl: string) {
    this.show(textOrTpl, { classname: 'bg-danger text-white fs-6', delay: 12000, title: 'Peligro', isError: true });
  }

  showDangerServer(textOrTpl: string) {
    this.show(textOrTpl, { classname: 'bg-danger text-white fs-6', delay: 20000, title: 'Peligro', isError: true });
  }

  private remove(toast: string) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  private clear() {
    this.toasts.splice(0, this.toasts.length);
  }
}
