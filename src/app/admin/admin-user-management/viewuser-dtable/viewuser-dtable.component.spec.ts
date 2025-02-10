import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewuserDtableComponent } from './viewuser-dtable.component';

describe('ViewuserDtableComponent', () => {
  let component: ViewuserDtableComponent;
  let fixture: ComponentFixture<ViewuserDtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewuserDtableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewuserDtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
