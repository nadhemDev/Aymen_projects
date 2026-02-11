import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPrioriteComponent } from './ajout-priorite.component';

describe('AjoutPrioriteComponent', () => {
  let component: AjoutPrioriteComponent;
  let fixture: ComponentFixture<AjoutPrioriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutPrioriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutPrioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
