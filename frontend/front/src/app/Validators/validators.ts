import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function createPassword(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    // password must be at least 8 characters long and contain a number, one upper
    const hasUppercaseCharacters = /[A-Z]+/.test(value);
    const hasLowercaseCharacters = /[a-z]+/.test(value);
    const hasNumber = /[0-9]+/.test(value);
    const validPassword = hasUppercaseCharacters && hasLowercaseCharacters && hasNumber;
    return validPassword ? null : { invalidPassword: true };
  };
}

export function noWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isWhitespace = (control.value || "").trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  };
}

export function isLink(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value || "";
    const isLink: boolean = value.includes(".");
    return isLink ? null : { link: true };
  };
}
