import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProperLeadComponent } from './proper-lead.component';

describe('ProperLeadComponent', () => {
  let component: ProperLeadComponent;
  let fixture: ComponentFixture<ProperLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProperLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProperLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
