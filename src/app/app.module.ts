import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import {PartnerComponent} from './partner/partner.component';
import {PartnerRegistrationComponent} from './partner/partner-registration/partner-registration.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { PartnerLoginComponent } from './partner/partner-login/partner-login.component';
import { ActionRedactionComponent } from './action-redaction/action-redaction.component';
import { AdministratorModule } from './administrator/administrator.module';
import { PartnerActionBuyComponent } from './partner/partner-action-buy/partner-action-buy.component';

@NgModule({
  declarations: [
    AppComponent,
    PartnerComponent,
    PartnerComponent,
    PartnerRegistrationComponent,
    PartnerLoginComponent,
    ActionRedactionComponent,
    PartnerActionBuyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    AdministratorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
