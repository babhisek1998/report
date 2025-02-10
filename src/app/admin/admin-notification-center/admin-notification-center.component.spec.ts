import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationCenterComponent } from './admin-notification-center.component';

describe('AdminNotificationCenterComponent', () => {
  let component: AdminNotificationCenterComponent;
  let fixture: ComponentFixture<AdminNotificationCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminNotificationCenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminNotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
