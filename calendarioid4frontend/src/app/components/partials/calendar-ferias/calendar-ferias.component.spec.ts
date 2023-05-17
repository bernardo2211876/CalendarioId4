import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFeriasComponent } from './calendar-ferias.component';

describe('CalendarFeriasComponent', () => {
  let component: CalendarFeriasComponent;
  let fixture: ComponentFixture<CalendarFeriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarFeriasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarFeriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
