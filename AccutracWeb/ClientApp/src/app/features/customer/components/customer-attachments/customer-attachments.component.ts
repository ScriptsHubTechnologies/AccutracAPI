import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as saveAs from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MyModalComponent } from 'src/app/features/my-modal/my-modal.component';
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
  overlayRef: OverlayRef;

  jobAddress: JobAddressInfo;
  previewCapturedImage: string = '';
  status: string = '';
  pdfpath: string;
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
    private toastr: ToastrService,
    public dialog: MatDialog,
    private overlay: Overlay) { }


  ngOnInit(): void {
    this.apiService.getJobAddressInfo(this.customerId).subscribe({
      next: (jobAddressInfo: JobAddressInfo) => {
        this.jobAddress = jobAddressInfo;
        this.getImagesByJobAddress(this.jobAddress.jobAddressId);
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '700px',
      height: '800px',
      data: { pdfPath: this.pdfpath }

    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  open() {
    // We create the overlay
    this.overlayRef = this.overlay.create();
    //Then we create a portal to render a component
    //const componentPortal = new ComponentPortal(MyModalComponent);
    // We add a custom CSS class to our overlay
    //this.overlayRef.addPanelClass("example-overlay");
    this.isOpen = true;
    //We render the portal in the overlay
    //this.overlayRef.attach(componentPortal);
  }

  downloadPdf(img: any) {
    this.apiService.getFile(img.attachmentId).subscribe({
      next: (data: any) => {
        saveAs("data:application/pdf;base64," + data, "Test.pdf");
      }
    })
  }

  downloadImage(img: any) {
    this.apiService.getFile(img.attachmentId).subscribe({
      next: (data: any) => {
        saveAs("data:application/png;base64," + data, "Test.png");
      }
    })
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
        this.back();
        this.toastr.success("Image Uploaded Successfully.")
        this.ngOnInit();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  cancel() {
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

  openPDF(img: any) {
    this.pdfpath = img.attachmenturl;
    this.openDialog();
  }

  back() {
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
    //for (var i = 0; i < this.uploadingFiles.length; i++) {
    //  formData.append("file[]", this.uploadingFiles[i]);
    //}
    let jobaddressId = this.jobAddress.jobAddressId;
    this.apiService.saveFiles(formData, this.customerId, jobaddressId).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.back();
      }
    });
  }
}
