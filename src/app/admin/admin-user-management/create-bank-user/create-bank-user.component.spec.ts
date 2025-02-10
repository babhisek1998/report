import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankUserComponent } from './create-bank-user.component';

describe('CreateBankUserComponent', () => {
  let component: CreateBankUserComponent;
  let fixture: ComponentFixture<CreateBankUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBankUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBankUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
