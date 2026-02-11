import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationPointageComponent } from './validation-pointage.component';

describe('ValidationPointageComponent', () => {
  let component: ValidationPointageComponent;
  let fixture: ComponentFixture<ValidationPointageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationPointageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationPointageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
