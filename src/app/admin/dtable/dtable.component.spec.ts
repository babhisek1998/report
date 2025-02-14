import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtableComponent } from './dtable.component';

describe('DtableComponent', () => {
  let component: DtableComponent;
  let fixture: ComponentFixture<DtableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
