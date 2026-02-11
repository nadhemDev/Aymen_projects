import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatureStructureComponent } from './add-nature-structure.component';

describe('AddNatureStructureComponent', () => {
  let component: AddNatureStructureComponent;
  let fixture: ComponentFixture<AddNatureStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNatureStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNatureStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
