import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuremetTypeComponent } from './measuremet-type.component';

describe('MeasuremetTypeComponent', () => {
  let component: MeasuremetTypeComponent;
  let fixture: ComponentFixture<MeasuremetTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasuremetTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasuremetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
