import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../../messages/messages.service';
import {Message} from '../../messages/message';
import {AdministratorService} from '../administrator.service';
import {Partner} from '../../partner/partner';
import {User} from '../../messages/user';

@Component({
  selector: 'app-administrator-messages',
  templateUrl: './administrator-messages.component.html',
  styleUrls: ['./administrator-messages.component.css']
})
export class AdministratorMessagesComponent implements OnInit {

  partnerMessages: Array<{ message: Message, partner: Partner }> = [];
  userMessages: Array<{ message: Message, user: User }> = [];

  constructor(
    private messagesService: MessagesService,
    private administratorService: AdministratorService
  ) { }

  ngOnInit() {
    this.messagesService.getPartnersMessages().subscribe(partnerMessages => {
      if (partnerMessages.length > 0) {
        const partnersIdList = [];
        partnerMessages.forEach(message => partnersIdList.push(message.userId));
        this.administratorService.getPartners(partnersIdList).subscribe(partners => {
          partnerMessages.forEach(message => {
            this.partnerMessages.push({
              message,
              partner: partners.find(partner => partner.id === message.partnerId)
            });
          });
        });
      }
    });

    this.messagesService.getUsersMessages().subscribe(userMessages => {
      if (userMessages.length > 0) {
        const usersIdList = [];
        userMessages.forEach(message => usersIdList.push(message.userId));
        this.messagesService.getUsers(usersIdList).subscribe(users => {
          userMessages.forEach(message => {
            this.userMessages.push({
              message,
              user: users.find(user => user.id === message.userId)
            });
          });
        });
      }
    });
  }

}
