import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorMessagesComponent } from './administrator-messages.component';

describe('AdministratorMessagesComponent', () => {
  let component: AdministratorMessagesComponent;
  let fixture: ComponentFixture<AdministratorMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
