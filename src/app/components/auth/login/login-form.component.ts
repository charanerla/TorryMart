import { Component } from '@angular/core';
import { UsersServive } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface UserDetails {
  userName: string;
  password: string;
}

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class LoginComponent {
  errorMsg: string = '';
  constructor(private _router: Router, private service: UsersServive) {}

  onClickSubmit(fieldsObj: UserDetails) {
    console.log('submit button clicked');
    // console.log(fieldsObj);
    if (this.service.isValidUser(fieldsObj)) {
      this.errorMsg = '';
      this._router.navigate(['/home']);
    } else {
      this.errorMsg = 'Invalid username and/or password';
    }
  }
}
