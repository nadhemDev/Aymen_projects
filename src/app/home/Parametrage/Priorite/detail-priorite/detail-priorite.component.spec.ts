import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPrioriteComponent } from './detail-priorite.component';

describe('DetailPrioriteComponent', () => {
  let component: DetailPrioriteComponent;
  let fixture: ComponentFixture<DetailPrioriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPrioriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPrioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
