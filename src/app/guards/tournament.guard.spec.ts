import { TestBed } from '@angular/core/testing';

import { TournamentGuard } from './tournament.guard';

describe('TournamentGuard', () => {
  let guard: TournamentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TournamentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
