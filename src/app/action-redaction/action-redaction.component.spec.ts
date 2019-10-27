import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRedactionComponent } from './action-redaction.component';

describe('ActionRedactionComponent', () => {
  let component: ActionRedactionComponent;
  let fixture: ComponentFixture<ActionRedactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRedactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRedactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
