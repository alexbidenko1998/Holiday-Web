import { Component, OnInit } from '@angular/core';
import {AdministratorService} from '../administrator.service';
import {Action} from '../../action';
import {Partner} from '../../partner/partner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administrator-actions',
  templateUrl: './administrator-actions.component.html',
  styleUrls: ['./administrator-actions.component.css']
})
export class AdministratorActionsComponent implements OnInit {

  actions: Action[];
  partners: Partner[];
  moderatingActions: Array<{ action: Action, partner: Partner }> = [];

  constructor(
    private administratorService: AdministratorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.administratorService.getActions().subscribe(actions => {
      this.actions = actions;
      const partnersIds = [];
      actions.forEach(action => partnersIds.push(action.partnerId));
      this.administratorService.getPartners(partnersIds).subscribe(partners => {
        this.partners = partners;

        this.actions.forEach(action => {
          this.moderatingActions.push({action, partner: this.partners.find(partner => action.partnerId === partner.id)});
        });
      });
    });
  }

  checkUpdateAction(index: number) {
    localStorage.setItem('lastAction', JSON.stringify(this.moderatingActions[index].action));
    this.router.navigateByUrl('administrator/redact-action').then(() => {});
  }

  createAction() {
    localStorage.removeItem('lastAction');
  }
}
