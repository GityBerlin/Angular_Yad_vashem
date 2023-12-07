import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitingHoursComponent } from './visiting-hours.component';

describe('VisitingHoursComponent', () => {
  let component: VisitingHoursComponent;
  let fixture: ComponentFixture<VisitingHoursComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitingHoursComponent]
    });
    fixture = TestBed.createComponent(VisitingHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
