import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheglobalbudgetComponent } from './afficheglobalbudget.component';

describe('AfficheglobalbudgetComponent', () => {
  let component: AfficheglobalbudgetComponent;
  let fixture: ComponentFixture<AfficheglobalbudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficheglobalbudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheglobalbudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
