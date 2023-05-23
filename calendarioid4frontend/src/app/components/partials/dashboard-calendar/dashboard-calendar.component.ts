import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarEvent,
  CalendarViewPeriod,
  CalendarMonthViewBeforeRenderEvent,
  CalendarWeekViewBeforeRenderEvent,
  CalendarDayViewBeforeRenderEvent,
  CalendarView,
} from 'angular-calendar';
import * as moment from 'moment';
import { AusenciaService } from 'src/app/services/services/ausencia.service';
import { AuthService } from 'src/app/services/services/auth.service';

interface EventColor {
  primary: string;
  secondary: string;
}

interface WeekDate {
  date: Date;
  start: Date;
  end: Date;
}

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrls: ['./dashboard-calendar.component.css'],
})
export class DashboardCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Week;
  myDate = new Date();
  viewDate: Date = new Date();
  data: any;
  events: CalendarEvent[] = [];
  eventsByUser: Record<string, CalendarEvent<any>[]> = {};

  period!: CalendarViewPeriod;

  constructor(
    private cdr: ChangeDetectorRef,
    private _http: HttpClient,
    private _authService: AuthService,
    private _ausenciaService: AusenciaService,
    private datePipe: DatePipe,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.data = this._authService.loadCurrentUser();
    this.carregarTeletrabalho();
  }

  beforeViewRender(
    event: CalendarMonthViewBeforeRenderEvent | CalendarWeekViewBeforeRenderEvent | CalendarDayViewBeforeRenderEvent
  ) {
    this.period = event.period;
    this.cdr.detectChanges();
  }

  carregarTeletrabalho() {
    this._ausenciaService.getAusenciasAceites().subscribe({
      next: (res: any[]) => {
        const groupedEvents: Record<string, CalendarEvent<any>[]> = {};

        res.forEach((event) => {
          const userId = event.ausencia.Utilizadorid;
          if (!groupedEvents[userId]) {
            groupedEvents[userId] = [];
          }

          let color: EventColor;
          let title: string;

          // Determine event color and title based on Estadoid
          if (event.tipoid === 2) {
            color = { primary: 'green', secondary: 'lightgreen' };
            title = 'Teletrabalho';
          } else if (event.Estadoid === 3) {
            color = { primary: 'red', secondary: 'lightred' };
            title = 'Ausência';
          } else if (event.Estadoid === 1) {
            color = { primary: 'blue', secondary: 'lightblue' };
            title = 'Fêrias';
          } else {
            color = { primary: 'grey', secondary: 'lightgrey' };
            title = 'Erro';
          }

          const newEvent = {
            title: title,
            start: new Date(event.Datahorainicio),
            end: new Date(event.Datahorafim),
            meta: { event },
            color: color,
            actions: [
              {
                label: 'Ver Detalhes',
                onClick: ({ event }: { event: CalendarEvent }): void => {
                  this.viewEventDetails(event.meta.event.Id);
                },
              },
            ],
          };

          groupedEvents[userId].push(newEvent);
        });

        this.events = ([] as CalendarEvent<any>[]).concat(...Object.values(groupedEvents));
        this.eventsByUser = groupedEvents;
        this.cdr.detectChanges();
      },
      error(error) {
        console.log(error);
      },
    });
  }

  viewEventDetails(eventid): void {
    console.log('View event details:', eventid);
    this._router.navigate(['/ausenciaview', eventid]);
    this.cdr.detectChanges();
  }

  handleEventClick({ event }: { event: CalendarEvent<any>; sourceEvent: MouseEvent | KeyboardEvent }): void {
    console.log('Event clicked:', event);
    const eventId = event.meta.event.Id;
    this.viewEventDetails(eventId);
  }

  prevMonth(): void {
    this.viewDate = moment(this.viewDate).subtract(1, 'months').toDate();
  }

  nextMonth(): void {
    this.viewDate = moment(this.viewDate).add(1, 'months').toDate();
  }

  getCurrentMonthLabel(): string {
    return moment(this.viewDate).format('MMMM YYYY');
  }

  getEventsByUserKeys(): string[] {
    return Object.keys(this.eventsByUser);
  }

  getWeekDates(viewDate: Date): WeekDate[] {
    const startOfWeek = moment(viewDate).startOf('week');
    const endOfWeek = moment(viewDate).endOf('week');

    const dates: WeekDate[] = [];

    let currentDate = startOfWeek.clone();

    while (currentDate <= endOfWeek) {
      dates.push({
        date: currentDate.toDate(),
        start: currentDate.clone().toDate(),
        end: currentDate.clone().endOf('day').toDate(),
      });
      currentDate = currentDate.clone().add(1, 'day');
    }

    return dates;
  }

  getEventsByUserAndDate(userId: string, day: WeekDate): CalendarEvent<any>[] {
    const events = this.eventsByUser[userId];
    if (events) {
      return events.filter((event) => {
        if (event.start && event.end) {
          return event.start >= day.start && event.end <= day.end;
        }
        return false;
      });
    }
    return [];
  }

  formatDate(weekDate: WeekDate): string {
    const date = weekDate.date instanceof Date ? weekDate.date : new Date(weekDate.date);
    return this.datePipe.transform(date, 'EEEE, MMMM d') || '';
  }
}
