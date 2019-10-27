import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Action} from '../action';
import {Server} from '../server';
import {Partner} from '../partner/partner';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getActions(): Observable<Action[]> {
    return this.httpClient.get<Action[]>(Server.url + '/administrator/get-actions');
  }

  getPartners(ids: number[]): Observable<Partner[]> {
    return this.httpClient.post<Partner[]>(Server.url + '/callback/partners', ids, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  loginAdministrator(body: object): Observable<HttpResponse<any>> {
    return this.httpClient.post(Server.url + '/administrator/login', body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response'
    });
  }

  check(headers: HttpHeaders): Observable<any> {
    return this.httpClient.get(Server.url + '/administrator/check', {
      headers
    });
  }

  acceptUpdateAction(action: Action): Observable<any> {
    return this.httpClient.post(Server.url + '/administrator/add-action', action, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  changePassword(headers: HttpHeaders, body: object): Observable<any> {
    return this.httpClient.put(Server.url + '/administrator/password', body, {
      headers
    });
  }
}
