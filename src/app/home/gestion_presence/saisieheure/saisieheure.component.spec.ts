import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieheureComponent } from './saisieheure.component';

describe('SaisieheureComponent', () => {
  let component: SaisieheureComponent;
  let fixture: ComponentFixture<SaisieheureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieheureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieheureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
