import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureStructureComponent } from './nature-structure.component';

describe('NatureStructureComponent', () => {
  let component: NatureStructureComponent;
  let fixture: ComponentFixture<NatureStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatureStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatureStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
