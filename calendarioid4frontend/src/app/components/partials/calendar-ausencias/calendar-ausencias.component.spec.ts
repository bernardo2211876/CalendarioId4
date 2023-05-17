import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAusenciasComponent } from './calendar-ausencias.component';

describe('CalendarAusenciasComponent', () => {
  let component: CalendarAusenciasComponent;
  let fixture: ComponentFixture<CalendarAusenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAusenciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarAusenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
