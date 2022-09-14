import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { ApiService } from 'src/app/core/services/api/api.service';
import customers from './Customer.json';
import products from './Product.json';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-customer-contract',
  templateUrl: './contract-pdf.component.html',
  styleUrls: ['./contract-pdf.component.scss']
})
export class GenerateContract implements OnInit {

  info1: any = (products as any).default;
  info2: any = (customers as any).default;

  statements: any ;
  @Input() customerId: string;
  apiurl = environment.apiurl;
  trigger: Subject<void> = new Subject();
  overlayRef: OverlayRef;

  customerData: Customer;
  noCustomerMessage: string;

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
  signatureImg: string;
  showError = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  signaturePadOptions: Object = {
    'minWidth': 2,
    'canvasWidth': 200,
    'canvasHeight': 80,
  };
  update = true;
  @ViewChild("print") print!: ElementRef;

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
        console.log("Product info", products);
        console.log("Customer info", customers);
        this.info2 = customers;
        this.info1 = products;
        this.info1.statements.forEach((ele: any, index: number) => {
          if (index == 0) {
            this.statements =(ele.statement);
          }
          else {
            this.statements = this.statements + (ele.statement);
          }
        })
        console.log("array", this.statements);
        //this.getImagesByJobAddress(this.jobAddress.jobAddressId);
      }
    })
  }

  //ngOnInit(): void {
  //  this.apiService.getCustomerById(this.customerId).subscribe({
  //    next: (response) => {
  //      console.log(response);
  //      this.customerData = response;
  //    },
  //    error: (e) => {
  //      this.noCustomerMessage = `No customer found with id ${this.customerId}`;
  //    }
  //  })
  //}

  //@ViewChild('content', { static: false }) el!: ElementRef
  @ViewChild('content', { static: false }) el!: ElementRef;

  public makepdf() {
    var data = document.getElementById('htmldata');
    let el1: HTMLElement = data as HTMLElement;
    html2canvas(el1).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      //var imgHeight = canvas.height * imgWidth / canvas.width;
      //var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, 0)
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.clear();
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
  }
  editSignature() {
    this.update = true;
  }
  savePad() {

    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
    this.update = false;
    this.showError = false;
  }

  hidebutton() {
    if (!this.signatureImg) {
      this.showError = true;
      return;
    }
    var button = document.getElementById('edit') as HTMLElement;
    button.style.display = 'none';
    this.print.nativeElement.click();
    setTimeout(() => {
      button.style.display = 'block';
    },5000)
  }
}
