import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainContainerComponent } from './admin-main-container.component';

describe('AdminMainContainerComponent', () => {
  let component: AdminMainContainerComponent;
  let fixture: ComponentFixture<AdminMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMainContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
