import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerActionBuyComponent } from './partner-action-buy.component';

describe('PartnerActionBuyComponent', () => {
  let component: PartnerActionBuyComponent;
  let fixture: ComponentFixture<PartnerActionBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerActionBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerActionBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
