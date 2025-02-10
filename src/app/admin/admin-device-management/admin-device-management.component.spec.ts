import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeviceManagementComponent } from './admin-device-management.component';

describe('AdminDeviceManagementComponent', () => {
  let component: AdminDeviceManagementComponent;
  let fixture: ComponentFixture<AdminDeviceManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeviceManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminDeviceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
