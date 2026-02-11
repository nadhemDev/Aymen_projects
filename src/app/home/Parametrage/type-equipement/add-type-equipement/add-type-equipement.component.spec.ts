import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeEquipementComponent } from './add-type-equipement.component';

describe('AddTypeEquipementComponent', () => {
  let component: AddTypeEquipementComponent;
  let fixture: ComponentFixture<AddTypeEquipementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeEquipementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
