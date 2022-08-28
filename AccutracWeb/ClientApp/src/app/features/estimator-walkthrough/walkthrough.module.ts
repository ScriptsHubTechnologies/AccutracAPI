import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalkthroughRoutingModule } from './walkthrough-routing.module';
import { WalkthroughPageComponent } from './pages/walkthrough-page/walkthrough-page.component';
import { WalkthroughComponent } from './components/walkthrough/walkthrough.component';
import { DetailsComponent } from './components/steps/details/details.component';
import { PhotoComponent } from './components/steps/photo/photo.component';
import { VideoComponent } from './components/steps/video/video.component';
import { InitialWalkthroughComponent } from './components/steps/initial-walkthrough/initial-walkthrough.component';
import { ChecklistComponent } from './components/steps/checklist/checklist.component';
import { ProposalComponent } from './components/steps/proposal/proposal.component';
import { AttachmentsComponent_W } from './components/steps/attachments/attachments.component';
import { SketchComponent } from './components/steps/sketch/sketch.component';
import { ReviewAndSignComponent } from './components/steps/review-and-sign/review-and-sign.component';
import { FollowUpComponent } from './components/steps/follow-up/follow-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    WalkthroughPageComponent,
    WalkthroughComponent,
    DetailsComponent,
    PhotoComponent,
    VideoComponent,
    InitialWalkthroughComponent,
    ChecklistComponent,
    ProposalComponent,
    AttachmentsComponent_W,
    SketchComponent,
    ReviewAndSignComponent,
    FollowUpComponent
  ],
  imports: [
    CommonModule,
    WalkthroughRoutingModule,
    SharedModule,
    MatRadioModule
  ]
})
export class WalkthroughModule { }
