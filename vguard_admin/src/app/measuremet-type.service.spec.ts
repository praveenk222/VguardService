import { TestBed } from '@angular/core/testing';

import { MeasuremetTypeService } from './measuremet-type.service';

describe('MeasuremetTypeService', () => {
  let service: MeasuremetTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasuremetTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
