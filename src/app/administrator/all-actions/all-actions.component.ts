import { Component, OnInit } from '@angular/core';
import {Action} from '../../action';
import {HttpClient} from '@angular/common/http';
import {Server} from '../../server';
import {Partner} from '../../partner/partner';
import {AdministratorService} from '../administrator.service';

@Component({
  selector: 'app-all-actions',
  templateUrl: './all-actions.component.html',
  styleUrls: ['./all-actions.component.css']
})
export class AllActionsComponent implements OnInit {

  actions: Action[];
  allActionsData: Array<{
    action: Action,
    partner: Partner
  }> = [];
  partners: Partner[] = [];
  currentDate: number;

  constructor(
    private httpClient: HttpClient,
    private administratorService: AdministratorService
  ) { }

  ngOnInit() {
    this.httpClient.get<Action[]>(Server.url + '/actions/partner/0').subscribe(actions => this.actions = actions);
    this.getAllActions(0);

    this.currentDate = new Date().getTime();
  }

  getAllActions(page: number) {
    this.httpClient.get<Action[]>(Server.url + '/actions/page?page=' + page).subscribe(actions => {
      if (actions.length > 0) {
        const partnersIds = [];
        actions.forEach(action => {
          if (action.partnerId !== 0) {
            partnersIds.push(action.partnerId);
          }
        });
        this.administratorService.getPartners(partnersIds).subscribe(partners => {
          this.partners = this.partners.concat(partners);
          actions.forEach(action => {
            if (action.partnerId !== 0) {
              this.allActionsData.push({
                action,
                partner: this.partners.find(partner => partner.id === action.partnerId)
              });
            }
          });
        });
        this.getAllActions(++page);
      }
    });
  }

  createAction() {
    localStorage.removeItem('lastAction');
  }

  updateAction(index: number) {
    localStorage.setItem('lastAction', JSON.stringify(this.actions[index]));
  }

  updatePartnerAction(index: number) {
    localStorage.setItem('lastAction', JSON.stringify(this.allActionsData[index].action));
  }
}
