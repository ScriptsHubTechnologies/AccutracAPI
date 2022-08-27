import { Component, OnInit } from '@angular/core';

interface WalkthroughStep {
  stepHeader: string;
  stepNumber: number;
  stepName: string;
}

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.component.html',
  styleUrls: ['./walkthrough.component.scss']
})
export class WalkthroughComponent implements OnInit {

  stepCounter: number = 0;
  currentStep: WalkthroughStep;
  headerLabel: string;
  prevButtonLabel: string;
  nextButtonLabel: string;

  steps: WalkthroughStep[] = [
    {
      stepHeader: 'Customer Details',
      stepNumber: 0,
      stepName: 'app-details'
    },
    {
      stepHeader: 'Property Photo',
      stepNumber: 1,
      stepName: 'app-photo'
    },
    {
      stepHeader: 'Education & Videos',
      stepNumber: 2,
      stepName: 'app-video'
    },
    {
      stepHeader: 'Initial Walkthrough',
      stepNumber: 3,
      stepName: 'app-initial-walkthrough'
    },
    {
      stepHeader: 'Checklist',
      stepNumber: 4,
      stepName: 'app-checklist'
    },
    {
      stepHeader: 'Proposal',
      stepNumber: 5,
      stepName: 'app-proposal'
    },
    {
      stepHeader: 'Attachments',
      stepNumber: 6,
      stepName: 'app-attachments'
    },
    {
      stepHeader: 'Sketch',
      stepNumber: 7,
      stepName: 'app-sketch'
    },
    {
      stepHeader: 'Review & Sign',
      stepNumber: 8,
      stepName: 'app-review-and-sign'
    },
    {
      stepHeader: 'Follow Up',
      stepNumber: 9,
      stepName: 'app-follow-up'
    }
  ]

  constructor() { }

  ngOnInit(): void {
    this.currentStep = this.steps[0];
    this.updateLabels();
  }

  nextStep() {
    this.stepCounter++;
    this.currentStep = this.steps[this.stepCounter];
    this.updateLabels();
  }

  previousStep() {
    this.stepCounter--;
    this.currentStep = this.steps[this.stepCounter];
    this.updateLabels();
  }

  updateLabels() {
    console.log(this.stepCounter);
    this.headerLabel = this.steps[this.stepCounter].stepHeader;
    if (this.stepCounter === 0) {
      this.prevButtonLabel = this.steps[this.stepCounter].stepHeader;
      this.nextButtonLabel = this.steps[this.stepCounter + 1].stepHeader;
    } else if (this.stepCounter === this.steps.length - 1) {
      this.prevButtonLabel = this.steps[this.stepCounter - 1].stepHeader;
      this.nextButtonLabel = this.steps[this.stepCounter].stepHeader;
    }
    else {
      this.prevButtonLabel = this.steps[this.stepCounter - 1].stepHeader;
      this.nextButtonLabel = this.steps[this.stepCounter + 1].stepHeader;
    }
    //this.prevButtonLabel = this.stepCounter <= 0 ? this.steps[this.stepCounter].stepHeader : this.steps[this.stepCounter - 1].stepHeader;
    //this.nextButtonLabel = this.stepCounter < this.steps.length - 1 ? this.steps[this.stepCounter + 1].stepHeader : this.steps[this.stepCounter].stepHeader;
  }

}
