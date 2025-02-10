import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantMainContainerComponent } from './merchant-main-container.component';

describe('MerchantMainContainerComponent', () => {
  let component: MerchantMainContainerComponent;
  let fixture: ComponentFixture<MerchantMainContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantMainContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MerchantMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
