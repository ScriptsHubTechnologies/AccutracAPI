import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'userId', 'status'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  userList: NewUser[];
  dataSource: MatTableDataSource<NewUser>;

  isLoading: boolean = true;

  noResults: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUserData().subscribe({
      next: (data: NewUser[]) => {
        console.log(data);
        this.userList = data;
        this.dataSource = new MatTableDataSource(this.userList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (e) => {
        console.log(e);
        this.isLoading = false;
        this.noResults = true;
      }
    })
  }

  goToUser(row: NewUser) {
    this.router.navigate(['/admin/users/' + row.userId]);
  }

  filterUsers(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
