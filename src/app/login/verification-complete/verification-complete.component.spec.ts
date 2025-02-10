import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationCompleteComponent } from './verification-complete.component';

describe('VerifiactionCompleteComponent', () => {
  let component: VerificationCompleteComponent;
  let fixture: ComponentFixture<VerificationCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificationCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerificationCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
