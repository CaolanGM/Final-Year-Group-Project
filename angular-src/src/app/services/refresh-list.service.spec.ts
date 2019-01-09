/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RefreshListService } from './refresh-list.service';

describe('RefreshListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshListService]
    });
  });

  it('should ...', inject([RefreshListService], (service: RefreshListService) => {
    expect(service).toBeTruthy();
  }));
});
