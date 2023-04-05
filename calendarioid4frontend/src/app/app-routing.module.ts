import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent  } from './components/pages/dashboard/dashboard.component';
import { SettingsComponent } from './components/partials/settings/settings.component';
import { TablesComponent } from './components/pages/tables/tables.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { ForgotpasswordComponent } from './components/partials/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './components/partials/resetpassword/resetpassword.component';
import { ButtonsComponent } from './components/partials/buttons/buttons.component';
import { NotificationsComponent } from './components/partials/notifications/notifications.component';
import { ModalsComponent } from './components/partials/modals/modals.component';
import { FormsComponent } from './components/pages/forms/forms.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PageNotFoudComponent } from './components/pages/page-not-foud/page-not-foud.component';
import { AuthGuard } from './services/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'settings', component: SettingsComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: 'buttons', component: ButtonsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'modals', component: ModalsComponent },
  { path: 'forms', component: FormsComponent },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'**', pathMatch: 'full', component: PageNotFoudComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
