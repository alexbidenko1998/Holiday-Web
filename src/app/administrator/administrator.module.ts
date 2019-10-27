import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import {AdministratorComponent} from './administrator.component';
import { AdministratorCategoriesComponent } from './administrator-categories/administrator-categories.component';
import {FormsModule} from "@angular/forms";
import { AdministratorActionsComponent } from './administrator-actions/administrator-actions.component';
import { AdministratorMessagesComponent } from './administrator-messages/administrator-messages.component';
import { AllActionsComponent } from './all-actions/all-actions.component';
import { AdministratorUsersComponent } from './administrator-users/administrator-users.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    AdministratorCategoriesComponent,
    AdministratorActionsComponent,
    AdministratorMessagesComponent,
    AllActionsComponent,
    AdministratorUsersComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    FormsModule
  ]
})
export class AdministratorModule { }
