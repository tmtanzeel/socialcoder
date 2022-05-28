import { TestBed } from '@angular/core/testing';

import { ProfessionListService } from './profession-list.service';

describe('ProfessionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProfessionListService = TestBed.get(ProfessionListService);
    expect(service).toBeTruthy();
  });
});
