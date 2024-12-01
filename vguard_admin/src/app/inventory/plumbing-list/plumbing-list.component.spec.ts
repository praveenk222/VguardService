import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlumbingListComponent } from './plumbing-list.component';

describe('PlumbingListComponent', () => {
  let component: PlumbingListComponent;
  let fixture: ComponentFixture<PlumbingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlumbingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlumbingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
