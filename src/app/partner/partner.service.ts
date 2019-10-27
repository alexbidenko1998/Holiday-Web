import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Partner} from './partner';
import {Server} from '../server';
import {Action} from '../action';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  registration(body: object): Observable<HttpResponse<any>> {
    return this.httpClient.post(Server.url + '/partners/registration', JSON.stringify(body), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    });
  }

  login(headers: HttpHeaders, body: object): Observable<HttpResponse<any>> {
    return this.httpClient.post(Server.url + '/partners/login', body, {
      headers,
      observe: 'response'
    });
  }

  check(headers: HttpHeaders): Observable<any> {
    return this.httpClient.get(Server.url + '/partners/check', {
      headers
    });
  }

  updatePartner(partner: Partner): Observable<any> {
    return this.httpClient.put(Server.url + '/partners/update', partner, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      }),
      observe: 'response'
    });
  }

  getPartnersAction(id: number): Observable<Action[]> {
    return this.httpClient.get<Action[]>(Server.url + '/actions/partner/' + id);
  }

  getModeratedPartnersAction(id: number): Observable<Action[]> {
    return this.httpClient.get<Action[]>(Server.url + '/actions/updated?partnerId=' + id);
  }

  getActionDetail(id: number): Observable<Action> {
    return this.httpClient.get<Action>(Server.url + '/actions/detail/' + id);
  }

  saveAction(action: Action, headers: object): Observable<any> {
    if (action.id > 0) {
      return this.httpClient.put(Server.url + '/actions/update/' + action.id, action, headers);
    } else {
      return this.httpClient.post(Server.url + '/actions/add', action, headers);
    }
  }

  deleteAction(id: number, headers: HttpHeaders): Observable<any> {
    return this.httpClient.delete(Server.url + '/actions/delete/' + id, {
      headers,
      observe: 'response'
    });
  }

  changePassword(headers: HttpHeaders, body: object): Observable<any> {
    return this.httpClient.put(Server.url + '/partners/password', body, {
      headers
    });
  }

  checkAddress(address: string): Observable<any> {
    return this.httpClient.get(Server.url + '/actions/address/' + address);
  }
}
