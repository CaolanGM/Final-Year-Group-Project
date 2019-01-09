/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuestViewBigSpendersComponent } from './guestViewBigSpenders.component';

describe('GuestViewBigSpendersComponent', () => {
  let component: GuestViewBigSpendersComponent;
  let fixture: ComponentFixture<GuestViewBigSpendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuestViewBigSpendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestViewBigSpendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
