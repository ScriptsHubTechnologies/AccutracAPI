import { UntypedFormGroup } from "@angular/forms";

export abstract class FormProvider {
    abstract getForm(): UntypedFormGroup;
  }