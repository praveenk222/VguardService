import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantrylistComponent } from './santrylist.component';

describe('SantrylistComponent', () => {
  let component: SantrylistComponent;
  let fixture: ComponentFixture<SantrylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SantrylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SantrylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
