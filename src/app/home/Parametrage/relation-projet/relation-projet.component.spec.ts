import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationProjetComponent } from './relation-projet.component';

describe('RelationProjetComponent', () => {
  let component: RelationProjetComponent;
  let fixture: ComponentFixture<RelationProjetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationProjetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
