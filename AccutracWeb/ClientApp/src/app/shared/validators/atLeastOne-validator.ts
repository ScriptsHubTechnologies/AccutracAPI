import { ValidationErrors, FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";

export const atLeastOneField: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const id = control.get('id')?.value;
    const lastName = control.get('lastName')?.value;
    const jobAddress = control.get('jobAddress')?.value;

    return (id || lastName || jobAddress) ? null : { atLeastOneRequired: true };
}

// export const passwordValidator: ValidatorFn = (
//     control: FormGroup
//   ): ValidationErrors | null => {
//     const password = control.get("password")?.value;
//     const confirmPassword = control.get("confirmPassword")?.value;
//     return password && confirmPassword && password === confirmPassword
//       ? null
//       : { passwordsNotEqual: true };
//   };