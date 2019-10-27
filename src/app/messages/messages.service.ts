import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message} from './message';
import {Server} from '../server';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPartnersMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(Server.url + '/callback/partners/page/0', {
      headers: new HttpHeaders({
        Administrator: Math.round(Math.random() * 1000000).toString(),
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  getUsersMessages(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(Server.url + '/callback/users/page/0', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }

  getUsers(usersIdList: number[]): Observable<User[]> {
    return this.httpClient.post<User[]>(Server.url + '/callback/users', usersIdList, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Token: localStorage.getItem('token')
      })
    });
  }
}
