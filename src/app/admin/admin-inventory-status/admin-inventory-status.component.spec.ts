import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInventoryStatusComponent } from './admin-inventory-status.component';

describe('AdminInventoryStatusComponent', () => {
  let component: AdminInventoryStatusComponent;
  let fixture: ComponentFixture<AdminInventoryStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInventoryStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminInventoryStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
