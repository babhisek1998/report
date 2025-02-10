import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageupdateComponent } from './languageupdate.component';

describe('LanguageupdateComponent', () => {
  let component: LanguageupdateComponent;
  let fixture: ComponentFixture<LanguageupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
