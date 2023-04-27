import { Component } from '@angular/core';
/*

import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';
*/
import * as FullCalendar from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})

export class CalendarComponent {
  /*
  Events: any[] = [];
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true
  };


  constructor(private httpClient: HttpClient) {}
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
  }
  ngOnInit() {
    setTimeout(() => {
      return this.httpClient
        .get('http://localhost:8888/event.php')
        .subscribe((res: any) => {
          this.Events.push(res);
          console.log(this.Events);
        });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        events: this.Events,
      };
    }, 2500);
    */
    calendar: FullCalendar.Calendar; // Declare a calendar variable
    calendario:any;
     constructor(){
      this.calendario=document.getElementById('calendar');
      this.calendar = new FullCalendar.Calendar(this.calendario, {
        plugins: [dayGridPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
        // ... other calendar options
      });
     }
    ngOnInit() {
      // Initialize the calendar and register plugin

      // Alternatively, you can register plugins using the use() method
      //FullCalendar.Calendar.use(dayGridPlugin);
      //FullCalendar.Calendar.use(timeGridPlugin);
  }
}
