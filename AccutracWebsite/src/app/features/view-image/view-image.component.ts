import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import saveAs from 'file-saver';
import { Attachment } from 'src/app/core/interfaces/customer/attachment';
import { DialogData } from 'src/app/core/interfaces/customer/DialogData';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  currentAttachmentToPreview: SafeResourceUrl;
  currentAT: Attachment;
  constructor(public dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.currentAT = this.data.pdfPath;
    this.setCurrentAttachment();
  }

  nextAttachment() {
    var index = this.data.attachments.indexOf(this.currentAT);
    index = index + 1;
    this.currentAT = this.data.attachments[index];
    this.setCurrentAttachment();
  }

  downloadAttachment() {
    saveAs("data:" + this.currentAT.attachmentType + ";base64," + this.currentAT.attachmentByteArray, this.currentAT.attachmentName);
  }

  prevAttachment() {
    var index = this.data.attachments.indexOf(this.currentAT);
    index = index - 1;
    this.currentAT = this.data.attachments[index];
    this.setCurrentAttachment();
  }

  setCurrentAttachment() {
    if (this.currentAT.attachmentType != "application/pdf") {
      this.currentAttachmentToPreview = this.sanitizer.bypassSecurityTrustResourceUrl("data:" + this.currentAT.attachmentType + ";base64," + this.currentAT.attachmentByteArray);
    }
    else {
      this.currentAttachmentToPreview = "data:" + this.currentAT.attachmentType + ";base64," + this.currentAT.attachmentByteArray;
    } 
  }

  checkIndex(i: number): boolean {
    var index = this.data.attachments.indexOf(this.currentAT);
    if (i == 0) {
      if (index == 0) {
        return false;
      }
      else {
        return true;
      }
    }
    else {
      if (index == (this.data.attachments.length - 1)) {
        return false;
      }
      else {
        return true;
      }
    }
  }
}
