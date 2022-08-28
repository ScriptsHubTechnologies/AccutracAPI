import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DBSchema, openDB } from 'idb';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { ApiService } from 'src/app/core/services/api/api.service';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { MyModalComponent } from 'src/app/features/my-modal/my-modal.component';
import { environment } from 'src/environments/environment';

const dbPromise = openDB('my-db', 1, {
  upgrade(db) {
    db.createObjectStore('Images');
  },
});

@Component({
  selector: 'app-customer-attachments',
  templateUrl: './customer-attachments.component.html',
  styleUrls: ['./customer-attachments.component.scss']
})
export class CustomerAttachmentsComponent implements OnInit {
  [x: string]: any;

  @Input() customerId: string;

  jobAddresses: any;
  selectedJobid: string = '';
  isCaptureButtonVisible=false;
  //isButtonVisible=true;
  //isTakePhotoVisible=false;
  isUploadVisible= true;
  isCustomcard=false;
  title = 'pwa-example';
  counter=0;
  stream: any = null;
  status: string = '';
  trigger: Subject<void> = new Subject();
  previewImage: any = '';
  imageobj:any='';
  btnLabel: string = "Capture Image";
  //ImageList = [];
  ImageList : [] ;
  ImageDateList :any=[] ;
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  imgs:any;
  previewImages:any=[];
  isImageshow=true;
  isCaptureVisible = false;
  isWebcamVisible= false;
  isAddphotoVisible=false;
  isCapturebtnVisible=false;
  apiurl = environment.apiurl;
  selectedFile: File;
  fileToUpload: File;  
  imageUrl: string;  
  myFiles:string [] = [];
  isPDFShow = false;
  pdfpath:string;
  
    get $trigger(): Observable<void> {
      return this.trigger.asObservable();
    }
  constructor( private apiService: ApiService,private router: Router,
    private http: HttpClient, private idbService: IdbService,
    private localStorage: LocalStorageService,private sanitizer: DomSanitizer,
    private toastr: ToastrService,public dialog: MatDialog) { }
    
    sanitizeImageUrl(imageUrl: string): SafeUrl {
      return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }
  
  ngOnInit(): void {
    this.apiService.getJobAddressInfo(this.customerId).subscribe({
      next: (jobAddressInfo) => {
        console.log(jobAddressInfo);
        this.jobAddresses = jobAddressInfo;
        console.log(this.jobAddresses.jobAddressId);
        this.getImagesByJobAddress(this.jobAddresses.jobAddressId);
      }
    })
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(MyModalComponent, {
      width: '500px',
      height: '500px',
      data: {pdfPath: this.pdfpath}
      
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.animal = result;
    });
  }

  getImagesByJobAddress(jobid:string){
    this.apiService.GetAttachementById(this.customerId,jobid).subscribe({
      next: (data) => {
        console.log(data);
        data.forEach(element => {
          element.attachmenturl = this.apiurl + '/' + element.attachmentPath
        });
        this.previewImages = data.reverse();

        //this.jobAddresses = jobAddressInfo;
        console.log(this.jobAddresses.jobAddressId);
      }
    })
  }

  snapshot(event: WebcamImage) {
    this.isWebcamVisible = false;
    this.imageobj = event;
    this.previewImage = event.imageAsDataUrl;
    this.isCaptureVisible = true;
    this.btnLabel = "Re-Take Image";
    this.isAddphotoVisible = true;
  //   this.storedimg();
  }

  buildJobAddress() {
   
    let jobAddress = {
      company_Code: this.localStorage.get('companyCode'),
      customerId: this.customerId,
      jobAddressId: this.jobAddresses.jobAddressId,
      functionTable: '',
      functionId: 0,
      attachmentType: '',
      attachmentName: this.customerId +'_'+ this.jobAddresses.jobAddressId,
      attachmentBase64String:this.previewImage,
      attachmentPath: '',
    }
    return jobAddress;
  }

  saveAttachmentData(){

    let jobAddressInfo = this.buildJobAddress();
    this.apiService.attachmentsSaveData(jobAddressInfo).subscribe({
      next: (data) => {
        this.isUploadVisible = true;
        this.isCustomcard = false;
        this.isCaptureButtonVisible=false;
        this.isAddphotoVisible=false;
        this.isImageshow=true;
        this.isCapturebtnVisible=false;
        this.isCaptureVisible=false;
        this.isWebcamVisible = false;
        this.toastr.success("Image Uploaded Successfully.")
        this.ngOnInit();
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  cancel(){
    this.isImageshow = false;
    this.isCapturebtnVisible=false;
    this.isWebcamVisible = false;
    this.isUploadVisible = true;
    this.isCustomcard = true;
    this.isAddphotoVisible = false;
    this.isCaptureVisible = false;
    this.isCustomcard = true;
  }

  capture() {
    this.isWebcamVisible = true;
    this.isCaptureVisible = false;
    this.btnLabel = "Capture Image";
    this.trigger.next();
  }

  addNewAttachment(){
    this.isCustomcard = true;
    this.isImageshow = false;
  }
  takePhoto(){
    this.isCaptureButtonVisible=true
    //this.isButtonVisible=false;
    this.isImageshow=false;
    this.isUploadVisible = false;
    this.isCustomcard =false;
    //this.isTakePhotoVisible=false;
    this.isWebcamVisible=true;
    this.isCapturebtnVisible = true;
    this.btnLabel = "Capture Image";
  }

  
  chooseFile(event: any) {
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
    }
  }

  openPDF(img:any){
    this.isImageshow = false;
    this.isPDFShow = true;
    console.log(img.attachmenturl);
    this.pdfpath = img.attachmenturl;
    //this.openDialog();
  }
  back(){
    this.isImageshow= true;
    this.isPDFShow = false;
    this.isCustomcard = false;
  }
 
  uploadFiles(){
    const formData = new FormData();
 
    for (var i = 0; i < this.myFiles.length; i++) { 
      formData.append("file[]", this.myFiles[i]);
    }

    let jobaddressId = this.jobAddresses.jobAddressId;
    this.apiService.SaveChooseFileData(formData,this.customerId,jobaddressId).subscribe({
      next: (data) => {
        this.ngOnInit();
        this.isCustomcard = false;
        this.isImageshow = true;
      }
    }); 
  }
}

  
interface MyDB extends DBSchema {
  'Images': {
    key: string;
    value: string;
  };
}

interface Images {  
  jobId: string;
  imageList: string[];
}
