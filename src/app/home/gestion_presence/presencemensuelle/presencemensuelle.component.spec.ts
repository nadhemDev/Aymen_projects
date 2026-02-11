import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresencemensuelleComponent } from './presencemensuelle.component';

describe('PresencemensuelleComponent', () => {
  let component: PresencemensuelleComponent;
  let fixture: ComponentFixture<PresencemensuelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresencemensuelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresencemensuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
