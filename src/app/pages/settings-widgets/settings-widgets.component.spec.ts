import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsWidgetsComponent } from './settings-widgets.component';

describe('SettingsWidgetsComponent', () => {
  let component: SettingsWidgetsComponent;
  let fixture: ComponentFixture<SettingsWidgetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsWidgetsComponent]
    });
    fixture = TestBed.createComponent(SettingsWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
