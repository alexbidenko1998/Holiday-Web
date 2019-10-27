import { Component, OnInit } from '@angular/core';
import {User} from '../../messages/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Server} from '../../server';
import {Partner} from '../../partner/partner';

@Component({
  selector: 'app-administrator-users',
  templateUrl: './administrator-users.component.html',
  styleUrls: ['./administrator-users.component.css']
})
export class AdministratorUsersComponent implements OnInit {

  users: User[];
  partners: Partner[];

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.httpClient.get<User[]>(Server.url + '/administrator/get/users/0', {
      headers: new HttpHeaders({
        Token: localStorage.getItem('token')
      })
    }).subscribe(users => {
      this.users = users;
    });

    this.httpClient.get<Partner[]>(Server.url + '/administrator/get/partners/0', {
      headers: new HttpHeaders({
        Token: localStorage.getItem('token')
      })
    }).subscribe(partners => {
      this.partners = partners;
    });
  }

}
