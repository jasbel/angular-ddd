import { AbstractControl, Validators } from '@angular/forms';

export const configValidationForm = {
  postalCode: [Validators.required, Validators.pattern(/^\d+$/)],
  integer: [Validators.required, Validators.pattern(/^\d+$/)],
  integerPattern: [Validators.pattern(/^\d+$/)],
  phone: [
    Validators.required,
    Validators.pattern(/^((\+[0-9]+ )+)?([0-9]{9,})$/),
  ],
  phonePattern: [Validators.pattern(/^((\+[0-9]+ )+)?([0-9]{9,})$/)],
  mobile: [
    Validators.required,
    Validators.pattern(/^((\+[0-9]+ )+)?([0-9]{9,})$/),
  ],
  email: [Validators.required, Validators.email],
  company: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(200),
  ],
  text: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(150),
  ],
  fullName: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(150),
  ],
  firstName: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(150),
  ],
  lastName: [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(150),
  ],
  image: [Validators.required],

  minLengthArray: (min: number) => {
    return (c: AbstractControl): { [key: string]: any } => {
      if (c.value.length >= min) return null as any;
      return { minLengthArray: { valid: false } };
    };
  },
};
