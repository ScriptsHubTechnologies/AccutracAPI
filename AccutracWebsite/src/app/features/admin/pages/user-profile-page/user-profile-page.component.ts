import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {

  header: string;
  userData: NewUser;

  userId: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.apiService.getUserData().subscribe({
      next: (data: NewUser[]) => {
        this.userData = data[0];
        this.header = this.userData.name;
        this.userService.emitUserData(this.userData);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}