/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicEventComponent } from './public-event.component';

describe('PublicEventComponent', () => {
  let component: PublicEventComponent;
  let fixture: ComponentFixture<PublicEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
