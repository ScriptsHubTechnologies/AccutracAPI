import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { NoteComponent } from './components/note/note.component';
import { CustomerJobAddressesComponent } from './components/customer-job-addresses/customer-job-addresses.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { NewJobAddressDialogComponent } from './components/new-job-address-dialog/new-job-address-dialog.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { NewLeadDialogComponent } from './components/new-lead-dialog/new-lead-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { JobAddressFormComponent } from './components/job-address-form/job-address-form.component';
import { WebcamModule } from 'ngx-webcam';
import { CustomerAttachmentsComponent } from './components/customer-attachments/customer-attachments.component';
import { GenerateContract } from './components/contract-pdf/contract-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxPrintModule } from 'ngx-print';
import { MatCardModule } from '@angular/material/card';
import { AngularSignaturePadModule } from '@almothafar/angular-signature-pad';
@NgModule({
  declarations: [
    CustomerDetailsComponent,
    CustomerPageComponent,
    NoteComponent,
    CustomerJobAddressesComponent,
    NewJobAddressDialogComponent,
    NewLeadDialogComponent,
    JobAddressFormComponent,
    CustomerAttachmentsComponent,
    GenerateContract,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule,
    MatTabsModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    GooglePlaceModule,
    WebcamModule,
    PdfViewerModule,
    NgxPrintModule,
    AngularSignaturePadModule,
    MatCardModule,
  ],
  providers: []
})
export class CustomerModule { }
