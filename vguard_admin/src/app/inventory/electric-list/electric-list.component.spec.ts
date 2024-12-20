import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectricListComponent } from './electric-list.component';

describe('ElectricListComponent', () => {
  let component: ElectricListComponent;
  let fixture: ComponentFixture<ElectricListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectricListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectricListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
