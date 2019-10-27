import { Component, OnInit } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {PartnerService} from '../partner.service';
import {Action} from '../../action';
import {Partner} from '../partner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-partner-action-buy',
  templateUrl: './partner-action-buy.component.html',
  styleUrls: ['./partner-action-buy.component.css']
})
export class PartnerActionBuyComponent implements OnInit {

  isFirstStep = true;
  action: Action;
  partner: Partner;

  constructor(
    private partnerService: PartnerService,
    private router: Router
  ) { }

  ngOnInit() {
    const action = localStorage.getItem('buyAction');
    const partner = localStorage.getItem('partner');
    if (partner == null) {
      this.router.navigateByUrl('partner/registration').then();
    } else if (action == null) {
      this.router.navigateByUrl('partner/action').then();
    } else {
      this.action = JSON.parse(action);
      this.partner = JSON.parse(partner);
    }
  }

  toBuy() {
    alert('А вот нет! Еще не подключил оплату. Съэкономите денюжку :)');
  }

  finish() {
    this.action.isCategoryTop = false;
    this.action.isInteresting = false;

    this.partnerService.saveAction(this.action, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      }),
      observe: 'response'
    }).subscribe(() => this.router.navigateByUrl('/partner').then(() => {
    }));
  }
}
