import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherhComponent } from './afficherh.component';

describe('AfficherhComponent', () => {
  let component: AfficherhComponent;
  let fixture: ComponentFixture<AfficherhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
