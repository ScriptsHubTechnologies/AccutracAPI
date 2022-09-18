import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Customersearch } from 'src/app/core/interfaces/customer/customersearch';
import { Customer } from 'src/app/core/interfaces/customer/customer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['customerid', 'firstName', 'lastName', 'jobAddress', 'city', 'state', 'zip', 'phone', 'email'];
  searchArray: Customer[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Customer>;

  isLoading: boolean = true;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let state = this.location.getState();

    if (this.isCustomerSearch(state)) {

      this.apiService.customerSearch(state).subscribe({
        next: (results) => {
          console.log(results);
          this.isLoading = false;
          this.searchArray = results;
          this.dataSource = new MatTableDataSource(this.searchArray);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (e) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(this.searchArray);
          console.error(e);
        }
      })
    } else {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.searchArray);
    }
  }

  filterCustomers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Type guard to convert state from unknown to CustomerSearch
  isCustomerSearch(search: unknown): search is Customersearch {
    return (search as Customersearch).lastName !== undefined;
  }

  goToCustomer(customerId: Number) {
    this.router.navigate(['/customers', customerId]);
  }

}
