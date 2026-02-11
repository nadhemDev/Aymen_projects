import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeprojetComponent } from './add-typeprojet.component';

describe('AddTypeprojetComponent', () => {
  let component: AddTypeprojetComponent;
  let fixture: ComponentFixture<AddTypeprojetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeprojetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
