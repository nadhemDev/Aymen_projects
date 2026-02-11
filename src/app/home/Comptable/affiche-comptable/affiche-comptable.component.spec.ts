import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheComptableComponent } from './affiche-comptable.component';

describe('AfficheComptableComponent', () => {
  let component: AfficheComptableComponent;
  let fixture: ComponentFixture<AfficheComptableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficheComptableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheComptableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
