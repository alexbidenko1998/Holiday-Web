import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorActionsComponent } from './administrator-actions.component';

describe('AdministratorActionsComponent', () => {
  let component: AdministratorActionsComponent;
  let fixture: ComponentFixture<AdministratorActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
