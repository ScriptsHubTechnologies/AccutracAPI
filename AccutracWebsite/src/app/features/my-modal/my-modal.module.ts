import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyModalComponent } from './my-modal.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [MyModalComponent],
  imports: [
    CommonModule,
    PdfViewerModule,
    MatDialogModule
  ],
  exports: [FormsModule, MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule]
})
export class MyModalModule { }
