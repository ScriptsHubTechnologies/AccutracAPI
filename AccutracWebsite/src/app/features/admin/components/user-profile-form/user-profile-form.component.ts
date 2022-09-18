import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NewUser } from 'src/app/core/interfaces/auth/new-user';
import { Role } from 'src/app/core/interfaces/role';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit {

  @Input() userId: string;
  @Output() userDataEvent = new EventEmitter<NewUser>();
  @Output() userFormData = new EventEmitter();

  roles: Role[];
  userData: NewUser;

  isLoading: boolean = true;

  userForm = this.fb.group({
    profile: new UntypedFormGroup({
      firstName: new UntypedFormControl('', Validators.required),
      lastName: new UntypedFormControl('', Validators.required),
      spectrumID: new UntypedFormControl('', [Validators.required, Validators.maxLength(10)]),
    }),
    loginInfo: new UntypedFormGroup({
      userEmail: new UntypedFormControl('', Validators.required),
      userPassword: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    }),
    roles: new UntypedFormGroup({})
  });

  constructor(
    private fb: UntypedFormBuilder,
    private apiService: ApiService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    if (this.userId) {
      console.log(this.userId);
      this.apiService.getUserData().subscribe({
        next: (data: NewUser[]) => {
          this.userData = data[0];
          this.fillUserForm(this.userData);
        },
        error: (e) => {
          console.error(e);
        }
      })
    }
  }

  getRoles() {
    this.userService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.buildRoleFields({ roles: this.roles });
      }
    })
  }

  buildRoleFields(fieldData: { roles: Role[] }) {
    if (fieldData.roles) {
      this.roles.forEach(role => {
        const control = new UntypedFormControl(false);
        (this.userForm.get('roles') as UntypedFormGroup).addControl(role.name, control);
      });
    }
    this.isLoading = false;
  }

  fillUserForm(userData: NewUser) {
    let first = userData.name.split(' ')[0];
    let last = userData.name.split(' ')[1];

    this.userForm.patchValue({
      profile: {
        firstName: first,
        lastName: last,
        spectrumID: userData.employeeId
      },
      loginInfo: {
        userEmail: userData.email,
      },
      roles: {
        [userData.userRoleName]: true
      },
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userFormData.emit(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
      this.userForm.markAsDirty();
    }
  }
}
