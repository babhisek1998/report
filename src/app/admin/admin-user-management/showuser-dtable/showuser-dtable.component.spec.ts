import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowuserDtableComponent } from './showuser-dtable.component';

describe('ShowuserDtableComponent', () => {
  let component: ShowuserDtableComponent;
  let fixture: ComponentFixture<ShowuserDtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowuserDtableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowuserDtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
