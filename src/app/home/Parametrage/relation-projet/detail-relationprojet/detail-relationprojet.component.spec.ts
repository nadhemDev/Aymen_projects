import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRelationprojetComponent } from './detail-relationprojet.component';

describe('DetailRelationprojetComponent', () => {
  let component: DetailRelationprojetComponent;
  let fixture: ComponentFixture<DetailRelationprojetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRelationprojetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRelationprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
