import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadManagerComponent } from './lead-manager.component';

describe('LeadManagerComponent', () => {
  let component: LeadManagerComponent;
  let fixture: ComponentFixture<LeadManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeadManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeadManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
