import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureJobComponent } from './nature-job.component';

describe('NatureJobComponent', () => {
  let component: NatureJobComponent;
  let fixture: ComponentFixture<NatureJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
