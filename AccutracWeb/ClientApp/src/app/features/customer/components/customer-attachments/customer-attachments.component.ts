import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { ViewImageComponent } from 'src/app/features/view-image/view-image.component';
import { environment } from 'src/environments/environment';
import { Attachment } from '../../../../core/interfaces/customer/attachment';

@Component({
  selector: 'app-customer-attachments',
  templateUrl: './customer-attachments.component.html',
  styleUrls: ['./customer-attachments.component.scss']
})
export class CustomerAttachmentsComponent implements OnInit {

  @Input() customerId: string;
  apiurl = environment.apiurl;
  trigger: Subject<void> = new Subject();

  jobAddress: JobAddressInfo;
  previewCapturedImage: string = '';
  status: string = '';
  pdfpath: Attachment;
  btnLabel: string = "Capture Image";
  attachments: any = [];
  uploadingFiles: string[] = [];
  
  showAttachments = true;
  showMediaOptions = false;
  showCameraOptions = false;
  showCamera = false;
  isOpen = false;
  
  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }
  constructor(private apiService: ApiService,
    private localStorage: LocalStorageService,
    public dialog: MatDialog) { }


  ngOnInit(): void {
    this.apiService.getJobAddressInfo(this.customerId).subscribe({
      next: (jobAddressInfo: JobAddressInfo) => {
        this.jobAddress = jobAddressInfo;
        this.getImagesByJobAddress(this.jobAddress.jobAddressId);
      }
    })
  }
  openImage(img: Attachment): void {
        const dialogRef = this.dialog.open(ViewImageComponent, {
          width: '800px',
          height: '700px',
          data: { pdfPath: img,attachments:this.attachments}
        });
  }
  getImagesByJobAddress(jobid?: number) {
    this.apiService.getAttachments(this.customerId, jobid).subscribe({
      next: (data: Attachment[]) => {
        data.forEach(element => {
          element.attachmentUrl = this.apiurl + '/' + element.attachmentPath
        });
        this.attachments = data.reverse();
      }
    })
  }

  snapshot(event: WebcamImage) {
    this.showCamera = false; 
    this.previewCapturedImage = event.imageAsDataUrl;
    this.btnLabel = "Re-Take Image";
  }

  buildAttachment() {
    let attachment: Attachment = {
      company_Code: this.localStorage.get('companyCode'),
      customerId: this.customerId,
      jobAddressId: this.jobAddress.jobAddressId,
      functionTable: '', 
      functionId: 0,
      attachmentType: '',
      attachmentName: this.customerId + '_' + this.jobAddress.jobAddressId,
      attachmentBase64String: this.previewCapturedImage,
      attachmentPath: '',
    }
    return attachment;
  }

  useImage() {
    let attachment = this.buildAttachment();
    this.apiService.saveAttachment(attachment).subscribe({
      next: (data) => {
        this.backTomainpage();
        this.ngOnInit();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  cancelButton() {
    this.showMediaOptions = true;
    this.showCameraOptions = false;
    this.showCamera = true;
  }

  capture() {
    this.showCamera = false;
    this.btnLabel = "Capture Image";
    this.trigger.next();
  }

  addNewAttachment() {
    this.showAttachments = false;
    this.showMediaOptions = true;
  }

  openCamera() {
    this.showMediaOptions = false;
    this.showCameraOptions = true;
    this.showCamera = true;
    this.btnLabel = "Capture Image";
  }

  chooseFile(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadingFiles.push(event.target.files[i]);
    }
  }

  backTomainpage() {
    this.showAttachments = true;
    this.showMediaOptions = false;
    this.showCameraOptions = false;
    this.showCamera = true;
    this.btnLabel = "Capture Image";
  }

  uploadFiles() {
    const formData = new FormData();
    this.uploadingFiles.forEach(file => {
      formData.append("file[]", file);
    })   
    let jobaddressId = this.jobAddress.jobAddressId;
    this.apiService.saveFiles(formData, this.customerId, jobaddressId).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.backTomainpage();
      }
    });
  }
  
}
