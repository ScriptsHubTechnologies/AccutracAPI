import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import saveAs from 'file-saver';
import { DialogData } from 'src/app/core/interfaces/customer/DialogData';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Attachment } from 'd:/Projects/Helitric/AccutracAPI/AccutracWeb/ClientApp/src/app/core/interfaces/customer/attachment';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.scss']
})
export class ViewImageComponent implements OnInit {
  currentImage: any;
  currentAT:any;
  currentType: import("d:/Projects/Helitric/AccutracAPI/AccutracWeb/ClientApp/src/app/core/interfaces/customer/attachment").Attachment | undefined;

  constructor(public dialogRef: MatDialogRef<ViewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private sanitizer:DomSanitizer,
    private apiService:ApiService) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
    this.currentAT=this.data.pdfPath;
    this.apiService.getFile(this.data.pdfPath.attachmentId).subscribe((res:any)=>{
      if(this.currentAT.attachmentType!="application/pdf"){
        this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray);       
     }
        else{
         this.currentImage = "data:"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray;
        } // this.currentType=this.data.attachments.find(x=>x.attachmentId==this.data.pdfPath.attachmentId);
    })
  }
  next(){
    var index=this.data.attachments.indexOf(this.currentAT);
    index=index+1;
    this.currentAT=this.data.attachments[index];
    this.apiService.getFile(this.currentAT.attachmentId).subscribe((res:any)=>{
      if(this.currentAT.attachmentType!="application/pdf"){
         this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray);       
      }
         else{
          this.currentImage = "data:"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray;
         }
     // this.currentType=this.data.attachments.find(x=>x.attachmentId==this.data.pdfPath.attachmentId);
      })

  }
  downloadPdf(img: any) {
    this.apiService.getFile(img.attachmentId).subscribe({
      next: (data: Attachment) => {
        if(this.currentAT.attachmentType=="application/pdf"){
        saveAs("data:application/pdf;base64," + data.attachmentByteArray, data.attachmentName);
        }
        else{
          saveAs("data:application/"+img.attachmentType+";base64," + data.attachmentByteArray, data.attachmentName);
        }
      }
    })
  }
  prev(){
    var index=this.data.attachments.indexOf(this.currentAT);
    index=index-1;
    this.currentAT=this.data.attachments[index];
    this.apiService.getFile(this.currentAT.attachmentId).subscribe((res:any)=>{
      if(this.currentAT.attachmentType!="application/pdf"){
        this.currentImage = this.sanitizer.bypassSecurityTrustResourceUrl("data:application/"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray);       
     }
        else{
         this.currentImage = "data:"+this.currentAT.attachmentType+";base64," + res.attachmentByteArray;
        }
       })
  }
  checkIndex(i:number):boolean{
    var index=this.data.attachments.indexOf(this.currentAT);
    if(i==0){
      if(index==0){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      if(index==(this.data.attachments.length-1)){
        return false;
      }
      else{
        return true;
      }
    }
  }
}
