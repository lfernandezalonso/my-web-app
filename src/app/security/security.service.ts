import { UserData } from './user.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class SecurityService {
  private userData: UserData;

  securityChange = new Subject<boolean>();

  constructor(private router: Router) {
  }

  onSession() {
    return this.userData != null;
  }

  registerUser(user: UserData) {
    this.userData = {
      email: user.email,
      Id: Math.round(Math.random() * 10000).toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      Password: user.Password
    };

    this.securityChange.next(true);
    this.router.navigate(['/login']);
  }

  loginUser(loginData: LoginData) {
    this.userData = {
      Id: Math.round(Math.random() * 10000).toString(),
      userName: loginData.userName,
      Password: loginData.Password,
      firstName:  '',
      lastName: '',
      email: ''
    };

    this.securityChange.next(true);
    this.router.navigate(['/']);
  }

  logoutUser() {
    this.userData = null;
    this.securityChange.next(false);
    this.router.navigate(['/login']);
  }

  getCurrUser() {
    return {...this.userData};
  }
}
