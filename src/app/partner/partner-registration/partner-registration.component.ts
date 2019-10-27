import { Component, OnInit } from '@angular/core';
import {PartnerService} from '../partner.service';
import {Router} from '@angular/router';
import {FormChecker} from '../../objects/form-checker';

@Component({
  selector: 'app-partner-registration',
  templateUrl: './partner-registration.component.html',
  styleUrls: ['./partner-registration.component.css']
})
export class PartnerRegistrationComponent implements OnInit {

  lastName: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value !== '';
      console.log(this.isValid);
    }
  };
  firstName: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value !== '';
    }
  };
  middleName: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value !== '';
    }
  };
  email: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      // tslint:disable-next-line:max-line-length
      const pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.isValid = pattern.test(this.value);
    }
  };
  password: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value.length > 7 && this.value.length < 65;
    }
  };
  repeatPassword: FormChecker = {
    value: '',
    isValid: null,
    checker() {}
  };

  constructor(
    private partnerService: PartnerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.repeatPassword.checker = () => {
      if (this.password.isValid) {
        this.repeatPassword.isValid = this.password.value === this.repeatPassword.value;
      } else {
        this.repeatPassword.isValid = null;
      }
    };
  }

  registration(): void {
    if (this.password.value === this.repeatPassword.value &&
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.email.isValid &&
        this.password.isValid) {
      const body = {
        id: null,
        lastName: this.lastName.value,
        firstName: this.firstName.value,
        middleName: this.middleName.value,
        email: this.email.value,
        password: this.password.value
      };
      this.partnerService.registration(body).subscribe(response => {
        if (response.ok) {
          body.id = response.body.id;
          localStorage.setItem('partner', JSON.stringify(body));
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('type', 'partner');
          localStorage.removeItem('login');
          localStorage.removeItem('password');
          this.router.navigateByUrl('/partner').then();
        } else { alert('Выбраный вами email уже используется'); }
      });
    }
  }
}
