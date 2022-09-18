import { ValidationErrors, FormGroup, ValidatorFn, AbstractControl } from "@angular/forms";

export const doPasswordsMatch: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordsDoNotMatch: true }
}
