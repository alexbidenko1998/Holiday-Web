import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AdministratorService} from './administrator.service';
import {HttpHeaders} from '@angular/common/http';
import {FormChecker} from '../objects/form-checker';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  newLogin: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value.length > 7 && this.value.length < 65;
    }
  };
  oldPassword: string;
  newPassword: FormChecker = {
    value: '',
    isValid: null,
    checker() {
      this.value = String(this.value).replace(new RegExp(' ', 'g'), '');
      this.isValid = this.value.length > 7 && this.value.length < 65;
    }
  };
  repeatNewPassword: FormChecker = {
    value: '',
    isValid: null,
    checker() {}
  };

  constructor(
    private router: Router,
    private administratorService: AdministratorService
  ) { }

  ngOnInit() {
    this.repeatNewPassword.checker = () => {
      if (this.newPassword.isValid) {
        this.repeatNewPassword.isValid = this.newPassword.value === this.repeatNewPassword.value;
      } else {
        this.repeatNewPassword.isValid = null;
      }
    };

    let login = localStorage.getItem('login');
    let password = localStorage.getItem('password');
    if (login == null || password == null) {
      login = prompt('Введите логин');
      password = prompt('Введите пароль');
      this.administratorService.loginAdministrator({
        login,
        password
      }).subscribe(response => {
        if (response.ok) {
          localStorage.removeItem('partner');
          localStorage.setItem('login', login);
          localStorage.setItem('password', password);
          localStorage.setItem('token', response.body.token);
          localStorage.setItem('type', 'administrator');
        } else {
          this.router.navigateByUrl('/partner').then();
        }
      });
    } else {
      this.administratorService.check(new HttpHeaders({
        Token: localStorage.getItem('token')
      })).subscribe(response => {
        if (!response.is) {
          this.administratorService.loginAdministrator(new HttpHeaders({
            login,
            password
          })).subscribe(response2 => {
            if (response2.ok) {
              localStorage.removeItem('partner');
              localStorage.setItem('token', response2.body.token);
            } else {
              this.router.navigateByUrl('/').then();
            }
          });
        } else {
          localStorage.removeItem('partner');
        }
      });
    }
  }

  logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigateByUrl('/').then();
  }

  changePassword() {
    if (this.newPassword.isValid && this.repeatNewPassword.isValid && this.newLogin.isValid) {
      this.administratorService.changePassword(new HttpHeaders({
        Token: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      }), {
        oldLogin: localStorage.getItem('login'),
        newLogin: this.newLogin.value,
        oldPassword: this.oldPassword,
        newPassword: this.newPassword.value
      }).subscribe(() => {
        localStorage.setItem('login', this.newLogin.value);
        localStorage.setItem('password', this.newPassword.value);
        alert('Данные успешно изменены');
        this.newLogin.value = '';
        this.oldPassword = '';
        this.newPassword.value = '';
        this.repeatNewPassword.value = '';
      });
    } else {
      alert('Пароли не совпадают');
    }
  }
}
