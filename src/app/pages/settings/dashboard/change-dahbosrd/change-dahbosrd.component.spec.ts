import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDahbosrdComponent } from './change-dahbosrd.component';

describe('ChangeDahbosrdComponent', () => {
  let component: ChangeDahbosrdComponent;
  let fixture: ComponentFixture<ChangeDahbosrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeDahbosrdComponent]
    });
    fixture = TestBed.createComponent(ChangeDahbosrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
