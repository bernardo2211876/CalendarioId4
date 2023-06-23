
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
    Component,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
  } from '@angular/core';
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
  //import { colors } from '../demo-utils/colors';

  interface EventColor {
    primary: string;
    secondary: string;
  }

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

    constructor(private cdr: ChangeDetectorRef, private _http: HttpClient,private _authService:AuthService,
      private _ausenciaService: AusenciaService, private datePipe: DatePipe, private _router: Router) {}



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
        this._ausenciaService.getTeletrabalhos(this.data.id).subscribe({
          next: (res:any[]) => {
            const newEvents = res.map(event=>{
              let color: EventColor;
              let title: string;
              if (event.Estadoid === 1) {
                // Green color for estadoid == 1
                color = { primary: 'green', secondary: 'lightgreen' };
                title= 'Aceite';
              } else if (event.Estadoid === 2) {
                // Red color for estadoid == 2
                color = { primary: 'red', secondary: 'lightred' };
                title= 'Recusado';
              } else if (event.Estadoid === 3) {
                // Grey color for estadoid == 3
                color = { primary: 'grey', secondary: 'lightgrey' };
                title= 'Pendente';
              } else {
                // Gray color for estadoid == 4
                color = { primary: 'gray', secondary: 'lightgray' };
                title= 'Cancelado';
              }

              return {
                title: title,
                start: new Date(event.Datahorainicio),
                end: new Date(event.Datahorafim),
                meta: { event },
                color:  color,
                actions: [
                  {
                    label: 'Ver Detalhes',
                    onClick: ({ event }: { event: CalendarEvent }): void => {
                      this.viewEventDetails(event.meta.event.Id);
                    }
                  }
                ]
              };
            });

              this.events = this.events.concat(newEvents);// this.events=[...this.events, ...newEvents];
              this.cdr.detectChanges();
          },
          error(error) {
            console.log(error);
          },
        });
      }
    }

    viewEventDetails(eventid): void {
      this._router.navigate(['/ausenciaview', eventid]);
      this.cdr.detectChanges();
    }

    handleEventClick({ event }: { event: CalendarEvent<any>; sourceEvent: MouseEvent | KeyboardEvent }): void {
      console.log("entrou", event)
      this.cdr.detectChanges();
      const eventId = event.meta.event.Id;
      this.viewEventDetails(eventId);
    }

    handleAllDayEventClick(event: any ): void {
      /*if (events.length === 1) {
        // If there is only one event, handle it directly
        const event = events[0];
        const eventId = event.meta.event.Id;
        this.viewEventDetails(eventId);
        // Handle the event click as needed
      } else {

      }*/
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
      const monthNamesPt = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
      ];
      const month = monthNamesPt[this.viewDate.getMonth()];
      const year = this.viewDate.getFullYear();
      return `${month} ${year}`;
    }
  }
