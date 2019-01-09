/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuestViewService } from './guestView.service';

describe('GuestViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuestViewService]
    });
  });

  it('should ...', inject([GuestViewService], (service: GuestViewService) => {
    expect(service).toBeTruthy();
  }));
});
