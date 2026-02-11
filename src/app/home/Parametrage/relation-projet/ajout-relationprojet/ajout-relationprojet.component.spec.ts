import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRelationprojetComponent } from './ajout-relationprojet.component';

describe('AjoutRelationprojetComponent', () => {
  let component: AjoutRelationprojetComponent;
  let fixture: ComponentFixture<AjoutRelationprojetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutRelationprojetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutRelationprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
