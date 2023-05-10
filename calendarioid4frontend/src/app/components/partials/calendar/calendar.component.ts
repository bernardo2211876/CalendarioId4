
  import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
  } from '@angular/core';
  import {
    CalendarEvent,
    CalendarViewPeriod,
    CalendarMonthViewBeforeRenderEvent,
    CalendarWeekViewBeforeRenderEvent,
    CalendarDayViewBeforeRenderEvent,
    CalendarView,
  } from 'angular-calendar';
import { AusenciaService } from 'src/app/services/services/ausencia.service';
import { AuthService } from 'src/app/services/services/auth.service';
  //import { colors } from '../demo-utils/colors';

  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
  })
  export class CalendarComponent implements OnInit{
    view: CalendarView = CalendarView.Month;
    myDate=new Date();
    viewDate: Date = new Date();
    data:any;
    events: CalendarEvent[] = [];

    period!: CalendarViewPeriod;

    constructor(private cdr: ChangeDetectorRef, private _http: HttpClient,private _authService:AuthService, private _ausenciaService: AusenciaService) {}

    ngOnInit(): void {
          this.data = this._authService.loadCurrentUser();
          this.carregarTeletrabalho();
          console.log(this.events);
    }

    beforeViewRender(
      event:
        | CalendarMonthViewBeforeRenderEvent
        | CalendarWeekViewBeforeRenderEvent
        | CalendarDayViewBeforeRenderEvent
    ) {
      this.period = event.period;
      this.cdr.detectChanges();
    }
    //formatDate(event.datahorafim,'yyyy-MM-ddTHH:mm:ss.sssZ','en-US')
    carregarTeletrabalho(){
      if (this.data.id) {
        this._ausenciaService.getTeletrabalhos(this.data.id).subscribe({
          next: (res:any[]) => {
            const newEvents = res.map(event=>({
                title: "Teletrabalho",
                start: new Date(event.datahorainicio),
                end: new Date(event.datahorafim),
                meta: {event}
              }));
              this.events = this.events.concat(newEvents);// [...this.events, ...newEvents];
              this.cdr.detectChanges();
          },
          error(error) {
            console.log(error);
          },
        });
      }
    }
  }
