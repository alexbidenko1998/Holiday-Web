import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministratorCategoriesComponent } from './administrator-categories.component';

describe('AdministratorCategoriesComponent', () => {
  let component: AdministratorCategoriesComponent;
  let fixture: ComponentFixture<AdministratorCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministratorCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministratorCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
