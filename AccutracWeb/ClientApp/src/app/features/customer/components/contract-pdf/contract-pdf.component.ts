import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { JobAddressInfo } from 'src/app/core/interfaces/job-address/job-address-info';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { ApiService } from 'src/app/core/services/api/api.service';
import customers from './Customer.json';
import products from './Product.json';
import { NgSignaturePadOptions, SignaturePadComponent  } from '@almothafar/angular-signature-pad';

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

  customerData: Customer;
  noCustomerMessage: string;

  jobAddress: JobAddressInfo;
  previewCapturedImage: string = '';
  status: string = '';
  pdfpath: string;
  btnLabel: string = "Capture Image";

  showAttachments = true;
  showMediaOptions = false;
  showCameraOptions = false;
  showCamera = false;
  isOpen = false;
  signatureImg: string;
  showError = false;

  @ViewChild('signature') 
  public signaturePad: SignaturePadComponent ;

  signaturePadOptions: NgSignaturePadOptions  = {
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
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.apiService.getJobAddressInfo(this.customerId).subscribe({
      next: (jobAddressInfo: JobAddressInfo) => {
        this.jobAddress = jobAddressInfo;
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
      }
    })
  }

  @ViewChild('content', { static: false }) el!: ElementRef;

  ngAfterViewInit() {
    this.signaturePad.set('minWidth', 2);
    this.signaturePad.clear();
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
