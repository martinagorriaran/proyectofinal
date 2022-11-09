import { TestBed } from '@angular/core/testing';

import { PatovaGuard } from './patova.guard';

describe('PatovaGuard', () => {
  let guard: PatovaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PatovaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
