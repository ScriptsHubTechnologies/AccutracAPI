import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customersearch } from 'src/app/core/interfaces/customer/customersearch';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { DataService } from 'src/app/core/services/data/data.service';
import { IdbService } from 'src/app/core/services/idb/idb.service';
import { atLeastOneField } from 'src/app/shared/validators/atLeastOne-validator';

interface searchType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchTypes: searchType[] = [
    { value: 'customers', viewValue: 'Customers' }
  ]

  selectedType = this.searchTypes[0].value;

  searchForm = this.fb.group({
    searchType: new UntypedFormControl(this.selectedType, Validators.required),
    searchTerms: new UntypedFormGroup({
      jobAddress: new UntypedFormControl(''),
      lastName: new UntypedFormControl('')
    }, { validators: atLeastOneField })
  })

  authStatusSubscription: Subscription;
  currentUidSubscription: Subscription;
  isAuthenticated: boolean;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private dataService: DataService,
    private authService: AuthenticationService,
    private apiService: ApiService,
    private idbService: IdbService
  ) { }
  ngOnInit(): void {
    console.log('init');
    this.idbService.clearUsers();

    this.dataService.initUser().subscribe({
      next: (uid) => {
        this.idbService.getUser(uid).subscribe({
          next: (user) => {
            if (user) {
              this.dataService.saveUserData(user);
            }
          },
          error: (e) => {
            console.error(e);
          }
        })
      }
    })
  }

  search() {
    this.searchForm.get('searchTerms')?.markAsTouched();
    if (this.searchForm.valid) {
      let searchTerms: Customersearch = {
        lastName: this.searchForm.get('searchTerms.lastName')?.value,
        jobAddress: this.searchForm.get('searchTerms.jobAddress')?.value
      }
      this.router.navigate(['/search'], { state: searchTerms });
    }
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
