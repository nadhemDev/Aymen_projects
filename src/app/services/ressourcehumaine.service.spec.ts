import { TestBed } from '@angular/core/testing';

import { RessourcehumaineService } from './ressourcehumaine.service';

describe('RessourcehumaineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RessourcehumaineService = TestBed.get(RessourcehumaineService);
    expect(service).toBeTruthy();
  });
});
