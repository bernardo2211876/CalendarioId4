import { DatePipe, formatDate } from '@angular/common';
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


@Component({
  selector: 'app-calendar-ausencias',
  templateUrl: './calendar-ausencias.component.html',
  styleUrls: ['./calendar-ausencias.component.css']
})
export class CalendarAusenciasComponent implements OnInit{
  view: CalendarView = CalendarView.Month;
  myDate=new Date();
  viewDate: Date = new Date();
  data:any;
  events: CalendarEvent[] = [];

  period!: CalendarViewPeriod;

  constructor(private cdr: ChangeDetectorRef, private _http: HttpClient,private _authService:AuthService,
    private _ausenciaService: AusenciaService, private datePipe: DatePipe) {}

  ngOnInit(): void {
        this.data = this._authService.loadCurrentUser();
        this.carregarTeletrabalho();
        //this.cdr.detectChanges();
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

  carregarTeletrabalho(){
    if (this.data.id) {
      this._ausenciaService.getAusencias(this.data.id).subscribe({
        next: (res:any[]) => {
          const newEvents = res.map(event=>({
              title: "Ausencias",
              start: new Date(event.Datahorainicio),
              end: new Date(event.Datahorafim),
              meta: {event}
            }));

            this.events = this.events.concat(newEvents);// this.events=[...this.events, ...newEvents];
            this.cdr.detectChanges();
        },
        error(error) {
          console.log(error);
        },
      });
    }
  }

}
