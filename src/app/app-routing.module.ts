import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PartnerComponent} from './partner/partner.component';
import {PartnerRegistrationComponent} from './partner/partner-registration/partner-registration.component';
import {PartnerLoginComponent} from './partner/partner-login/partner-login.component';
import {ActionRedactionComponent} from './action-redaction/action-redaction.component';
import {PartnerActionBuyComponent} from './partner/partner-action-buy/partner-action-buy.component';

const routes: Routes = [
  {path: '', redirectTo: 'partner', pathMatch: 'full'},
  {path: 'partner/registration', component: PartnerRegistrationComponent},
  {path: 'partner/login', component: PartnerLoginComponent},
  {path: 'partner/action', component: ActionRedactionComponent},
  {path: 'partner/action-buy', component: PartnerActionBuyComponent},
  {path: 'partner', component: PartnerComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
