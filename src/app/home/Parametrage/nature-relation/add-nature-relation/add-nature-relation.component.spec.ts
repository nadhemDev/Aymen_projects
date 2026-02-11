import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatureRelationComponent } from './add-nature-relation.component';

describe('AddNatureRelationComponent', () => {
  let component: AddNatureRelationComponent;
  let fixture: ComponentFixture<AddNatureRelationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNatureRelationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNatureRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
