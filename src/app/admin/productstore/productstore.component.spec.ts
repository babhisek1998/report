import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstoreComponent } from './productstore.component';

describe('ProductstoreComponent', () => {
  let component: ProductstoreComponent;
  let fixture: ComponentFixture<ProductstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductstoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
