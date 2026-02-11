import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatureJobComponent } from './add-nature-job.component';

describe('AddNatureJobComponent', () => {
  let component: AddNatureJobComponent;
  let fixture: ComponentFixture<AddNatureJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNatureJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNatureJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
