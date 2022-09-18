import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormProvider } from './form-provider';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
  providers: [{ provide: FormProvider, useExisting: LeadComponent }]
})
export class LeadComponent extends FormProvider implements OnInit {

  customerForm = this.fb.group({
    step1: new UntypedFormGroup({
      residential: new UntypedFormGroup({
        firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      }),
      commercial: new UntypedFormGroup({
        companyName: new UntypedFormControl('', [Validators.required]),
        firstName: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
      }),
      jobAddress: new UntypedFormGroup({
        street: new UntypedFormControl('', Validators.required),
        city: new UntypedFormControl('', Validators.required),
        state: new UntypedFormControl('', Validators.required),
        zip: new UntypedFormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
      }),
      mailingAddress: new UntypedFormGroup({
        street: new UntypedFormControl('', Validators.required),
        city: new UntypedFormControl('', Validators.required),
        state: new UntypedFormControl('', Validators.required),
        zip: new UntypedFormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
      }),
      contact: new UntypedFormGroup({
        phone: new UntypedFormControl('', [Validators.required, Validators.pattern('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')]),
        phoneType: new UntypedFormControl('', Validators.required),
        email: new UntypedFormControl('', [Validators.email])
      }),
    }),
    step2: new UntypedFormGroup({
      leadSource: new UntypedFormGroup({
        source: new UntypedFormControl('', Validators.required),
        secondarySource: new UntypedFormControl('', Validators.required),
        referredBy: new UntypedFormControl('')
      }),
      leadInfo: new UntypedFormGroup({
        leadType: new UntypedFormControl('', Validators.required),
        isPropertyOwner: new UntypedFormControl(''),
        issueDescription: new UntypedFormControl(''),
        issueNoticed: new UntypedFormControl(''),
        desiredStartDate: new UntypedFormControl(''),
        previousCustomer: new UntypedFormControl(''),
        howHeardAboutUs: new UntypedFormControl('')
      }),
      notesForSales: new UntypedFormGroup({
        notes: new UntypedFormControl('')
      })
    })
  })

  headerText: string;

  getForm() {
    return this.customerForm;
  }

  constructor(
    private fb: UntypedFormBuilder,
    public router: Router,
    private route: ActivatedRoute
  ) {
    super();

    this.route.queryParams.subscribe(params => {
      let leadid = params['leadid']
      this.router.events.subscribe(route => {
        if (this.router.url.toString().includes('step1')) {
          this.headerText = 'Create a customer'
        }
        else if (this.router.url.toString().includes('step2')) {
          this.headerText = 'Create a lead';
          if (leadid) {
            this.headerText = 'Update an existing lead';
          }
        }
      });
    });
  }

  ngOnInit(): void { }

}
