import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Partner} from './partner';
import {PartnerService} from './partner.service';
import {HttpHeaders} from '@angular/common/http';
import {Action} from '../action';
import {FormChecker} from '../objects/form-checker';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit {

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
  partner: Partner;
  actions: Action[];
  moderatedActions: Action[];
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

  currentDate: number;

  constructor(
    private router: Router,
    private partnerService: PartnerService
  ) {}

  ngOnInit() {
    this.repeatNewPassword.checker = () => {
      if (this.newPassword.isValid) {
        this.repeatNewPassword.isValid = this.newPassword.value === this.repeatNewPassword.value;
      } else {
        this.repeatNewPassword.isValid = null;
      }
    };
/*this.hero$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')))
  );*/
    const checkPartner = JSON.parse(localStorage.getItem('partner'));
    if (checkPartner == null) {
      this.router.navigateByUrl('/partner/registration').then(() => { });
    } else {
      this.partner = checkPartner;
      this.firstName.value = this.partner.firstName;
      this.lastName.value = this.partner.lastName;
      this.middleName.value = this.partner.middleName;
      this.email.value = this.partner.email;
      this.partnerService.check(new HttpHeaders({
        Token: localStorage.getItem('token')
      })).subscribe(response => {
        if (response.is) {
          this.partnerService.getPartnersAction(this.partner.id).subscribe(actions => {
            this.actions = actions;
          });

          this.partnerService.getModeratedPartnersAction(this.partner.id).subscribe(moderatedActions => {
            this.moderatedActions = moderatedActions;
          });
        } else {
          this.router.navigateByUrl('/partner/login').then(() => { });
        }
      });
    }

    this.currentDate = new Date().getTime();
  }

  logout(): void {
    localStorage.removeItem('partner');
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    this.router.navigateByUrl('/partner/registration').then(() => { });
  }

  updatePartner() {
    if (this.lastName.isValid !== false &&
      this.firstName.isValid !== false &&
      this.middleName.isValid !== false &&
      this.email.isValid !== false) {
      this.partner.lastName = this.lastName.value;
      this.partner.firstName = this.firstName.value;
      this.partner.middleName = this.middleName.value;
      this.partner.email = this.email.value;

      this.partnerService.updatePartner(this.partner).subscribe(() => {
        localStorage.setItem('partner', JSON.stringify(this.partner));
        alert('Данные успешно обновлены');
      });
    }
  }

  deleteAction(id: number) {
    if (confirm('Вы действительно хотите удалить: "' + this.actions.find(action => action.id === id).title + '"?')) {
      this.partnerService.deleteAction(id, new HttpHeaders({
        Token: localStorage.getItem('token')
      })).subscribe(response => console.log(response) );
      this.actions = this.actions.filter(action => action.id !== id);
    }
  }

  toNewAction() {
    localStorage.removeItem('lastAction');
  }

  moderateAction(action: Action) {
    localStorage.setItem('lastAction', JSON.stringify(action));
    this.router.navigateByUrl('/partner/action').then();
  }

  changePassword() {
    if (this.newPassword.isValid && this.repeatNewPassword.isValid) {
      this.partnerService.changePassword(new HttpHeaders({
        Token: localStorage.getItem('token')
      }), {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword.value
      }).subscribe(() => {
        this.partner.password = this.newPassword.value;
        localStorage.setItem('partner', JSON.stringify(this.partner));
        alert('Пароль успешно изменен');
        this.oldPassword = '';
        this.newPassword.value = '';
        this.repeatNewPassword.value = '';
      });
    } else {
      alert('Пароли не совпадают');
    }
  }
}
