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
  attachments = [] as Attachment[];
  selectedAttachment: Attachment;
  uploadingFiles: string[] = [];
  btnLabel: string = "Capture Image";

  showAttachments = true;
  showMediaOptions = false;
  showCameraOptions = false;
  showCamera = false;
  
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
    this.selectedAttachment = {
      company_Code: this.localStorage.get('companyCode'),
      customerId: this.customerId,
      jobAddressId: this.jobAddress.jobAddressId,
      functionTable: '',
      functionId: 0,
      attachmentType: event.imageAsDataUrl.substring(event.imageAsDataUrl.indexOf(':') + 1, event.imageAsDataUrl.indexOf(';')),
      attachmentName: this.customerId + '_' + this.jobAddress.jobAddressId,
      attachmentBase64String: event.imageAsDataUrl,
      attachmentPath: '',
    }
    this.btnLabel = "Re-Capture Image";
  }

  useImage() {
    this.apiService.saveAttachment(this.selectedAttachment).subscribe({
      next: (data) => {
        this.backToMainpage();
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
    this.trigger.next();
  }

  addNewAttachment() {
    this.showAttachments = false;
    this.showMediaOptions = true;
  }

  openCamera(reCapture:boolean) {
    this.showMediaOptions = false;
    this.showCameraOptions = true;
    this.showCamera = true;
    this.btnLabel = reCapture ? "Re Capture Image" : "Capture Image";
  }

  chooseFile(event: any) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.uploadingFiles.push(event.target.files[i]);
    }
  }

  backToMainpage() {
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
        this.backToMainpage();
      }
    });
  }
  
}
