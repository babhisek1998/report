import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDeliveryStatusComponent } from './device-delivery-status.component';

describe('DeviceDeliveryStatusComponent', () => {
  let component: DeviceDeliveryStatusComponent;
  let fixture: ComponentFixture<DeviceDeliveryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDeliveryStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceDeliveryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
