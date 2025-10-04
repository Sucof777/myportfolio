import { TestBed } from '@angular/core/testing';

import { LanguageService } from './languague.service';

describe('LanguagueService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
