import { TestBed } from '@angular/core/testing';

import { SharedsameApiDataService } from './sharedsame-api-data.service';

describe('SharedsameApiDataService', () => {
  let service: SharedsameApiDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsameApiDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
