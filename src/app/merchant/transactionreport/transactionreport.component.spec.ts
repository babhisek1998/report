import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionreportComponent } from './transactionreport.component';

describe('TransactionreportComponent', () => {
  let component: TransactionreportComponent;
  let fixture: ComponentFixture<TransactionreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionreportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
