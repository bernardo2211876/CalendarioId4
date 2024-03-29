import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ModalsComponent } from './components/partials/modals/modals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/services/auth.service';
import { CommonModule, Location } from '@angular/common';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoudComponent } from './components/pages/page-not-foud/page-not-foud.component';
import { ForbiddenPageComponent } from './components/pages/forbidden-page/forbidden-page.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { UserlistComponent } from './components/pages/userlist/userlist.component';
import { UsereditComponent } from './components/pages/useredit/useredit.component';
import { DataTablesModule } from 'angular-datatables';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { UserviewComponent } from './components/pages/userview/userview.component';
import { ModaladdaprovadorComponent } from './components/partials/modaladdaprovador/modaladdaprovador.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/partials/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar2Component } from './components/partials/calendar2/calendar2.component';
import { FeriasComponent } from './components/pages/ferias/ferias.component';
import { TeletrabalhoComponent } from './components/pages/teletrabalho/teletrabalho.component';
import { AusenciasComponent } from './components/pages/ausencias/ausencias.component';
import { MatDatepickerModule,MatDatepicker } from '@angular/material/datepicker';
import { ModaladdausenciaComponent } from './components/partials/modaladdausencia/modaladdausencia.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import {DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import { MtxDatetimepickerModule } from '@ng-matero/extensions/datetimepicker';
import { TeletrabalhoaprovComponent } from './components/pages/teletrabalhoaprov/teletrabalhoaprov.component';
import { FeriasaprovComponent } from './components/pages/feriasaprov/feriasaprov.component';
import { AusenciaaprovComponent } from './components/pages/ausenciaaprov/ausenciaaprov.component';
import { DatePipe } from '@angular/common';
import { CalendarFeriasComponent } from './components/partials/calendar-ferias/calendar-ferias.component';
import { CalendarAusenciasComponent } from './components/partials/calendar-ausencias/calendar-ausencias.component'
import { AusenciaviewComponent } from './components/pages/ausenciaview/ausenciaview.component';
import * as moment from 'moment';
import { DashboardCalendarComponent } from './components/partials/dashboard-calendar/dashboard-calendar.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { GridButtonsComponent } from './components/partials/grid-buttons/grid-buttons.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    GridButtonsComponent,
    ModalsComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoudComponent,
    LoadingComponent,
    ForbiddenPageComponent,
    NavbarComponent,
    UserlistComponent,
    UsereditComponent,
    UserviewComponent,
    ModaladdaprovadorComponent,
    NavbarComponent,
    CalendarComponent,
    Calendar2Component,
    FeriasComponent,
    TeletrabalhoComponent,
    AusenciasComponent,
    ModaladdausenciaComponent,
    TeletrabalhoaprovComponent,
    FeriasaprovComponent,
    AusenciaaprovComponent,
    CalendarFeriasComponent,
    CalendarAusenciasComponent,
    AusenciaviewComponent,
    DashboardCalendarComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    DataTablesModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    NgbModalModule,
    FullCalendarModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    DateTimePickerModule,
    NgxMaterialTimepickerModule,
    MtxDatetimepickerModule,
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false}),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory}),

  ],
  exports: [AppComponent],

  providers: [
    AuthService,
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
