import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/partials/settings/settings.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ForgotpasswordComponent } from './components/partials/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/partials/resetpassword/resetpassword.component';
import { ButtonsComponent } from './components/partials/buttons/buttons.component';
import { FormsComponent } from './components/pages/forms/forms.component';
import { ModalsComponent } from './components/partials/modals/modals.component';
import { NotificationsComponent } from './components/partials/notifications/notifications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SettingsComponent,
    TablesComponent,
    SigninComponent,
    SignupComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ButtonsComponent,
    FormsComponent,
    ModalsComponent,
    NotificationsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BsDropdownModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }