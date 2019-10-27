import { Component, OnInit } from '@angular/core';
import {PartnerService} from '../partner.service';
import {Partner} from '../partner';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-partner-login',
  templateUrl: './partner-login.component.html',
  styleUrls: ['./partner-login.component.css']
})
export class PartnerLoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(
    private router: Router,
    private partnerService: PartnerService
  ) { }

  ngOnInit() {
  }

  login(): void {
    this.partnerService.login(new HttpHeaders({
      'Content-Type': 'application/json'
    }), {
      email: this.email,
      password: this.password
    }).subscribe(response => {
      if (response.ok) {
        const responseBody = response.body;
        const partner: Partner = responseBody.partner;
        partner.password = this.password;
        localStorage.setItem('partner', JSON.stringify(partner));
        localStorage.setItem('token', responseBody.token);
        localStorage.setItem('type', 'partner');
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        this.router.navigateByUrl('/partner').then(() => { });
      }
    });
  }
}
