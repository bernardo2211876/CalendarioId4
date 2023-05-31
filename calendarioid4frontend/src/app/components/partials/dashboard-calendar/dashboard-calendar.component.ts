import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, Input } from '@angular/core';
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



interface LegendItem {
  title: string;
  color: string;
}

@Component({
  selector: 'app-dashboard-calendar',
  templateUrl: './dashboard-calendar.component.html',
  styleUrls: ['./dashboard-calendar.component.css'],
})
export class DashboardCalendarComponent implements OnInit {
  @Input() view: CalendarView = CalendarView.Month;
  myDate=new Date();
  viewDate: Date = new Date();
  data:any;
  events: CalendarEvent[] = [];
  activeDay: Date | null = null;
  @Input() locale!: string;

  period!: CalendarViewPeriod;
  legendItems = [
    { label: 'teletrabalho', colorClass: 'teletrabalho-color' },
    { label: 'ausencias', colorClass: 'ausencias-color' },
    { label: 'ferias', colorClass: 'ferias-color' }
  ];

  getItemClass(item: any): string {
    return item.colorClass;
  }

  constructor(private cdr: ChangeDetectorRef, private _http: HttpClient,private _authService:AuthService,
    private _ausenciaService: AusenciaService, private datePipe: DatePipe, private _router: Router) {}


  ngOnInit(): void {
        this.data = this._authService.loadCurrentUser();



        this.carregarAusencias();
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

  carregarAusencias(){
      this._ausenciaService.getAusenciasAceites().subscribe({
        next: (res:any[]) => {
          const newEvents = res.map(event=>{
            let color: EventColor;
            let title: string;
            title =event.nome;
            if (event.ausencia.Tipoid === 2) {
              color = { primary: 'green', secondary: 'lightgreen' };

            } else if (event.ausencia.Tipoid === 3) {
              color = { primary: 'red', secondary: '#FFAABB' };

            } else if (event.ausencia.Tipoid === 1) {
              color = { primary: 'blue', secondary: 'lightblue' };

            } else {
              color = { primary: 'grey', secondary: 'lightgrey' };
              title = 'Erro';
            }

            return {
              title: title,
              start: new Date(event.ausencia.Datahorainicio),
              end: new Date(event.ausencia.Datahorafim),
              meta: { event },
              color:  color,
              actions: [
                {
                  label: 'Ver Detalhes',
                  onClick: ({ event }: { event: CalendarEvent }): void => {
                    this.viewEventDetails(event.meta.event.ausencia.Id);
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

  viewEventDetails(eventid): void {
    console.log('View event details:', eventid);
    this._router.navigate(['/ausenciaview', eventid]);
    this.cdr.detectChanges();
  }

  handleEventClick({ event }: { event: CalendarEvent<any>; sourceEvent: MouseEvent | KeyboardEvent }): void {
    console.log("entrou", event)
    this.cdr.detectChanges();
    const eventId = event.meta.event.ausencia.Id;
    this.viewEventDetails(eventId);
  }

  handleAllDayEventClick(event: any ): void {
    this.activeDay = event.start;
  }

  prevMonth(): void {
    this.viewDate = moment(this.viewDate).subtract(1, 'months').toDate();
  }

  nextMonth(): void {
    this.viewDate = moment(this.viewDate).add(1, 'months').toDate();
  }

  getCurrentMonthLabel(): string {
    //return moment(this.viewDate).format('MMMM YYYY');
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
