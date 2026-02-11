import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioriteComponent } from './priorite.component';

describe('PrioriteComponent', () => {
  let component: PrioriteComponent;
  let fixture: ComponentFixture<PrioriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
