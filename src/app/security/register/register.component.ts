import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private securityService: SecurityService) {

   }

  ngOnInit(): void {
  }

  registerUser(form: NgForm) {
    this.securityService.registerUser({
      userName: form.value.user_uname,
      firstName: form.value.user_firstname,
      lastName: form.value.user_lastname,
      email: form.value.user_email,
      Password: form.value.user_password,
      Id: ''
    })
    //console.log(form);
    //alert(form);
  }

}
