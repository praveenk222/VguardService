import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesurmentLookupComponent } from './mesurment-lookup.component';

describe('MesurmentLookupComponent', () => {
  let component: MesurmentLookupComponent;
  let fixture: ComponentFixture<MesurmentLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MesurmentLookupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesurmentLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
