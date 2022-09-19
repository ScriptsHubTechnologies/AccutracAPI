import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import saveAs from 'file-saver';
import { Attachment } from 'src/app/core/interfaces/customer/attachment';
import { DialogData } from 'src/app/core/interfaces/customer/DialogData';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewAttachmentComponent implements OnInit {
  currentAttachmentToPreview: SafeResourceUrl;
  currentAT: Attachment;
  constructor(public dialogRef: MatDialogRef<ViewAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer: DomSanitizer,
    private apiService:ApiService) { }

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

  downloadAttachment(attachment:Attachment) {
    if (attachment.attachmentType != "application/pdf") {
      saveAs("data:" + attachment.attachmentType + ";base64," + attachment.attachmentByteArray, attachment.attachmentName);
    }
    else{
      if(attachment.attachmentByteArray==null){
        this.apiService.getFile(attachment.attachmentId).subscribe((data:Attachment)=>{
          saveAs("data:" + attachment.attachmentType + ";base64," + data.attachmentByteArray, attachment.attachmentName);
        })
      }
      else{
        saveAs("data:" + attachment.attachmentType + ";base64," + attachment.attachmentByteArray, attachment.attachmentName);
      }
    }
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
    else{
      if(this.currentAT.attachmentByteArray==null){
        this.apiService.getFile(this.currentAT.attachmentId).subscribe((data:Attachment)=>{
          this.currentAttachmentToPreview = "data:" + this.currentAT.attachmentType + ";base64," + data.attachmentByteArray, this.currentAT.attachmentName;
        })
      }
      else{
        this.currentAttachmentToPreview = "data:" + this.currentAT.attachmentType + ";base64," + this.currentAT.attachmentByteArray, this.currentAT.attachmentName;
      }
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
