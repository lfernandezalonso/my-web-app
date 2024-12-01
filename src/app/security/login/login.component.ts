import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private securityService: SecurityService) {

  }

  ngOnInit(): void {
  }

  loginUser(form: NgForm) {
    this.securityService.loginUser({
      userName: form.value.user_name,
      Password: form.value.user_password
    })
    console.log(form);

  }


}
