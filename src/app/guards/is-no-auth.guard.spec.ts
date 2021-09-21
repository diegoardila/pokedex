import { TestBed } from '@angular/core/testing';

import { IsNoAuthGuard } from './is-no-auth.guard';

describe('IsNoAuthGuard', () => {
  let guard: IsNoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsNoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
