import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-user-page',
  templateUrl: './new-user-page.component.html',
  styleUrls: ['./new-user-page.component.scss']
})
export class NewUserPageComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
