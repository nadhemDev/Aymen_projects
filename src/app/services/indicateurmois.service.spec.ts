import { TestBed } from '@angular/core/testing';

import { IndicateurmoisService } from './indicateurmois.service';

describe('IndicateurmoisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndicateurmoisService = TestBed.get(IndicateurmoisService);
    expect(service).toBeTruthy();
  });
});
