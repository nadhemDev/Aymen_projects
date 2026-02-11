import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeRessourceComponent } from './groupe-ressource.component';

describe('GroupeRessourceComponent', () => {
  let component: GroupeRessourceComponent;
  let fixture: ComponentFixture<GroupeRessourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeRessourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeRessourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
