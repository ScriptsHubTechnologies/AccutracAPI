import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-initial-walkthrough',
  templateUrl: './initial-walkthrough.component.html',
  styleUrls: ['./initial-walkthrough.component.scss']
})
export class InitialWalkthroughComponent implements OnInit {

  walkThroughForm = this.fb.group({
    general: new UntypedFormGroup({
      lengthOfOWnership: new UntypedFormControl(''),
      previousRepairs: new UntypedFormControl(''),
      levelOfProtection: new UntypedFormControl(''),
      priorProfessionalAdvice: new UntypedFormControl(''),
      reccomendedProfessionalAdvice: new UntypedFormControl(''),
      otherDecisionMakers: new UntypedFormControl(''),
      biggestConcern: new UntypedFormControl(''),
      otherIssues: new UntypedFormControl('')
    }),
    basementWaterproofing: new UntypedFormGroup({
      mostWater: new UntypedFormControl(''),
      waterFrequency: new UntypedFormControl(''),
      waterLocation: new UntypedFormControl('')
    }),
    foundationRepair: new UntypedFormGroup({
      foundationProblems: new UntypedFormControl(''),
      lengthOfProblems: new UntypedFormControl(''),
      problemChanges: new UntypedFormControl(''),
      floorsOutOfLevel: new UntypedFormControl(''),
      directionOfSlopes: new UntypedFormControl(''),
      interiorSupportType: new UntypedFormControl(''),
      stabilizeOrLift: new UntypedFormControl(''),
      biggestConcern: new UntypedFormControl('')
    }),
    crawlSpaceWaterproofing: new UntypedFormGroup({
      crawlSpaceProblems: new UntypedFormControl(''),
      lengthOfProblems: new UntypedFormControl(''),
      asthemaOrAllergies: new UntypedFormControl(''),
      mold: new UntypedFormControl(''),
      termiteContract: new UntypedFormControl('')
    }),
    generalConstruction: new UntypedFormGroup({
      foundationProblems: new UntypedFormControl(''),
      lengthOfProblems: new UntypedFormControl(''),
      problemChanges: new UntypedFormControl(''),
      floorsOutOfLevel: new UntypedFormControl(''),
      directionOfSlopes: new UntypedFormControl('')
    })
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

}
