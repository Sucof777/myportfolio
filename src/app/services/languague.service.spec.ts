import { TestBed } from '@angular/core/testing';

import { LanguagueService } from './languague.service';

describe('LanguagueService', () => {
  let service: LanguagueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguagueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
