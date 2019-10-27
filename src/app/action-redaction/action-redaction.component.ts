import { Component, OnInit } from '@angular/core';
import {Action} from '../action';
import {Category} from '../categories/category';
import {SubCategory} from '../categories/sub-category';
import {CategoriesService} from '../categories/categories.service';
import {PartnerService} from '../partner/partner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdministratorService} from '../administrator/administrator.service';
import {Server} from '../server';

@Component({
  selector: 'app-action-redaction',
  templateUrl: './action-redaction.component.html',
  styleUrls: ['./action-redaction.component.css']
})
export class ActionRedactionComponent implements OnInit {

  action: Action = new Action();
  actionBefore: Date;
  categories: Category[];
  subCategories: SubCategory[];
  actionImage: any;
  actionImageUrl: string;

  isValidTitle: boolean;
  isValidProfit: boolean;
  isValidNewCost: boolean;
  isValidAddress: boolean;
  isValidPhone: boolean;
  isValidCategory: boolean;
  isValidSubCategory: boolean;
  isValidSite: boolean;
  isValidWorkTime: {
    weekdays: { start: boolean, end: boolean },
    saturday: { start: boolean, end: boolean },
    sunday: { start: boolean, end: boolean }
  };
  isValidImage: boolean;
  isValidInformation: boolean;
  isValidActionBefore: boolean;

  constructor(
    private categoriesService: CategoriesService,
    private partnerService: PartnerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private administratorService: AdministratorService
  ) { }

  ngOnInit() {
    this.action.workTime = {
      weekdays: {start: '', end: ''},
      saturday: {start: '', end: ''},
      sunday: {start: '', end: ''}
    };
    this.action.socialNetworks = {
      instagram: '',
      twitter: '',
      facebook: '',
      vk: ''
    };
    this.isValidWorkTime = {
      weekdays: {start: null, end: null},
      saturday: {start: null, end: null},
      sunday: {start: null, end: null}
    };

    if (localStorage.getItem('lastAction') != null) {
      this.action = JSON.parse(localStorage.getItem('lastAction'));
      this.actionImageUrl = Server.url + '/images/get/' + this.action.image;
      this.actionBefore = new Date(this.action.actionBefore);
    }

    if (localStorage.getItem('type') == null) {
      this.router.navigateByUrl('/partner/registration').then(() => {
      });
    }

    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
    this.categoriesService.getSubCategories().subscribe(subCategories => this.subCategories = subCategories);

    if (this.action.id > 0 && !this.action.phone) {
      this.action.workTime = {
        weekdays: {start: '', end: ''},
        saturday: {start: '', end: ''},
        sunday: {start: '', end: ''}
      };
      this.action.socialNetworks = {
        instagram: '',
        twitter: '',
        facebook: '',
        vk: ''
      };
      this.isValidWorkTime = {
        weekdays: {start: null, end: null},
        saturday: {start: null, end: null},
        sunday: {start: null, end: null}
      };
      this.partnerService.getActionDetail(this.action.id).subscribe(action => {
        this.action.address = action.address;
        this.action.phone = action.phone;
        this.action.workTime = action.workTime;
        this.action.information = action.information;
        this.action.socialNetworks = action.socialNetworks;
        this.action.createTime = action.createTime;
        this.action.site = action.site;

        this.checkForm();
      });
    } else {
      this.checkForm();
    }
  }

  changeActionImage(event: any) {
    this.actionImage = event.target.files[0];
    this.categoriesService.uploadImage(this.actionImage).subscribe(filename => {
      this.action.image = filename.filename;
      this.actionImageUrl = Server.url + '/images/get/' + filename.filename;
      this.isValidImage = true;
    } );
  }

  saveAction(): void {
    if (this.checkForm()) {
      this.action.actionBefore = new Date(this.actionBefore).getTime();
      if (localStorage.getItem('type') === 'partner') {
        localStorage.setItem('buyAction', JSON.stringify(this.action));

        this.router.navigateByUrl('partner/action-buy').then();
      } else {
        this.administratorService.acceptUpdateAction(
          this.action
        ).subscribe(() => this.router.navigateByUrl('administrator/actions'));
      }
    }
  }

  checkForm(): boolean {
    this.checkerTitle();
    this.checkerProfit();
    this.checkerNewCost();
    this.checkerPhone();
    this.checkerAddress();
    this.isValidImage = this.action.image !== '' && this.action.image !== null;
    this.checkerCategory();
    this.checkerSubCategory();
    if (this.isValidSite === false) { this.action.site = ''; this.isValidSite = null; }
    let isValidWorkTime = true;
    for (const i of Object.keys(this.action.workTime)) {
      for (const k of Object.keys(this.action.workTime[i])) {
        this.isValidWorkTime[i][k] = this.action.workTime[i][k] !== '';
        isValidWorkTime = isValidWorkTime && this.isValidWorkTime[i][k];
      }
    }
    this.checkerActionBefore();
    return this.isValidTitle && this.isValidProfit && this.isValidNewCost &&
      this.isValidPhone && this.isValidAddress && this.isValidImage &&
      this.isValidCategory && this.isValidSubCategory &&
      isValidWorkTime && this.isValidActionBefore;
  }

  checkerTitle() {
    this.isValidTitle = this.action.title.trim() !== '' && this.action.title.length < 81;
  }
  checkerProfit() {
    this.isValidProfit = !!this.action.profit;
  }
  checkerNewCost() {
    this.isValidNewCost = !!this.action.newCost;
  }
  checkerAddress() {
    if (this.action.address.trim() !== '') {
      this.partnerService.checkAddress(this.action.address).subscribe(response => {
          this.isValidAddress = !!response.Latitude;
        }
      );
    } else {
      this.isValidAddress = false;
    }
  }
  checkerPhone() {
    this.isValidPhone = this.action.phone.trim() !== '';
  }
  checkerSite() {
    if (this.action.site.trim() !== '') {
      if (!this.action.site.startsWith('http')) {
        this.action.site = 'https://' + this.action.site;
      }
      fetch(this.action.site)
        .then(result => this.isValidSite = result.ok)
        .catch(() => this.isValidSite = false);
    } else {
      this.isValidSite = null;
    }
  }
  checkerInformation() {
    this.isValidInformation = this.action.information.length < 451;
  }
  checkerCategory() {
    this.isValidCategory = !!this.action.category;
  }
  checkerSubCategory() {
    this.isValidSubCategory = !!this.action.subCategory;
  }
  checkerActionBefore() {
    console.log(this.actionBefore);
    this.isValidActionBefore = new Date(this.actionBefore).getTime() > new Date().getTime();
  }
}
