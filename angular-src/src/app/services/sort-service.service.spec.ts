/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SortServiceService } from './sort-service.service';

describe('SortServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SortServiceService]
    });
  });

  it('should ...', inject([SortServiceService], (service: SortServiceService) => {
    expect(service).toBeTruthy();
  }));
});
