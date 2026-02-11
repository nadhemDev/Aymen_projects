import { TestBed } from '@angular/core/testing';

import { ParametrageService } from './parametrage.service';

describe('ParametrageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParametrageService = TestBed.get(ParametrageService);
    expect(service).toBeTruthy();
  });
});
