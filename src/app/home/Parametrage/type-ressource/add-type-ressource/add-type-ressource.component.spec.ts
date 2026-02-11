import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeRessourceComponent } from './add-type-ressource.component';

describe('AddTypeRessourceComponent', () => {
  let component: AddTypeRessourceComponent;
  let fixture: ComponentFixture<AddTypeRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
