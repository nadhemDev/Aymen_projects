import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupeRessourceComponent } from './add-groupe-ressource.component';

describe('AddGroupeRessourceComponent', () => {
  let component: AddGroupeRessourceComponent;
  let fixture: ComponentFixture<AddGroupeRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupeRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupeRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
