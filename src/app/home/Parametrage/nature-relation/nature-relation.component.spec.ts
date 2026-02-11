import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureRelationComponent } from './nature-relation.component';

describe('NatureRelationComponent', () => {
  let component: NatureRelationComponent;
  let fixture: ComponentFixture<NatureRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
