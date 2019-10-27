import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdministratorComponent} from './administrator.component';
import {AdministratorCategoriesComponent} from './administrator-categories/administrator-categories.component';
import {AdministratorActionsComponent} from './administrator-actions/administrator-actions.component';
import {AdministratorMessagesComponent} from './administrator-messages/administrator-messages.component';
import {ActionRedactionComponent} from '../action-redaction/action-redaction.component';
import {AllActionsComponent} from './all-actions/all-actions.component';
import {AdministratorUsersComponent} from './administrator-users/administrator-users.component';
import {PartnerComponent} from "../partner/partner.component";

const routes: Routes = [
  {
    path: 'administrator',
    component: AdministratorComponent,
    children: [
      {
        path: 'categories',
        component: AdministratorCategoriesComponent
      },
      {
        path: 'actions',
        component: AdministratorActionsComponent
      },
      {
        path: 'messages',
        component: AdministratorMessagesComponent
      },
      {
        path: 'all-actions',
        component: AllActionsComponent
      },
      {
        path: 'users',
        component: AdministratorUsersComponent,
        children: [
          {
            path: 'partner/:id',
            component: PartnerComponent
          },
          {
            path: 'user/:id',
            component: PartnerComponent
          }
        ]
      }
    ]
  },
  {
    path: 'administrator/redact-action',
    component: ActionRedactionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
