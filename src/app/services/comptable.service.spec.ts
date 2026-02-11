import { TestBed } from '@angular/core/testing';

import { ComptableService } from './comptable.service';

describe('ComptableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComptableService = TestBed.get(ComptableService);
    expect(service).toBeTruthy();
  });
});
