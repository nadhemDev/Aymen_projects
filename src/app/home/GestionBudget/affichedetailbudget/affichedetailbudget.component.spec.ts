import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichedetailbudgetComponent } from './affichedetailbudget.component';

describe('AffichedetailbudgetComponent', () => {
  let component: AffichedetailbudgetComponent;
  let fixture: ComponentFixture<AffichedetailbudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichedetailbudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichedetailbudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
