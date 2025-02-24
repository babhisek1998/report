import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowLeadComponent } from './row-lead.component';

describe('RowLeadComponent', () => {
  let component: RowLeadComponent;
  let fixture: ComponentFixture<RowLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowLeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RowLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
