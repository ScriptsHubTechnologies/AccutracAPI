import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { Note } from 'src/app/core/interfaces/note';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customerData: Customer
  notes: Note[];
  customerId: string;

  @Input()
  set customerInfo(input: Customer) {
    this.customerData = input;
  }

  customerDetailsForm = this.fb.group({
    firstName: new UntypedFormControl('', [Validators.required]),
    lastName: new UntypedFormControl('', [Validators.required]),
    companyName: new UntypedFormControl(''),
    mailingAddress: new UntypedFormControl('', [Validators.required]),
    mailingCity: new UntypedFormControl('', [Validators.required]),
    mailingState: new UntypedFormControl('', [Validators.required]),
    mailingZip: new UntypedFormControl('', [Validators.required, Validators.pattern('^\\d{5}$')]),
    phone: new UntypedFormControl('', [Validators.required, Validators.pattern('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')]),
    phoneType: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.email])
  })

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    console.log(this.customerData);
    this.mapCustomerData(this.customerData);

    // this.apiService.getCustomerNotes(this.customerData.customerid).subscribe({
    //   next: (notes) => {
    //     console.log(notes);
    //     this.notes = notes;
    //   }
    // })

  }

  mapCustomerData(data: Customer) {
    this.customerDetailsForm.patchValue(data);
  }

  uploadFile(files: any) {
    if (files.length === 0) {
      return;
    }

    const formData = new FormData();
    const fileToUpload = files[0] as File;
    formData.append('file', fileToUpload);
    formData.append('filename', fileToUpload.name);
    // const httpOptions = {
    //   headers: new HttpHeaders({'Content-Type': 'application/json'})
    // }
    //console.log(formData);
    //console.log(fileToUpload);

    //this.apiService.SaveChooseFileData(formData).subscribe({
    //  next:(data)=>{

    //  }

    //})
  }

}
