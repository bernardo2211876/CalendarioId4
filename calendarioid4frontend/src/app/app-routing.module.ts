import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent  } from './components/pages/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { PageNotFoudComponent } from './components/pages/page-not-foud/page-not-foud.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ForbiddenPageComponent } from './components/pages/forbidden-page/forbidden-page.component';
import { UserlistComponent } from './components/pages/userlist/userlist.component';
import { UsereditComponent } from './components/pages/useredit/useredit.component';
import { UserviewComponent } from './components/pages/userview/userview.component';
import { TeletrabalhoComponent } from './components/pages/teletrabalho/teletrabalho.component';
import { FeriasComponent } from './components/pages/ferias/ferias.component';
import { AusenciasComponent } from './components/pages/ausencias/ausencias.component';
import { TeletrabalhoaprovComponent } from './components/pages/teletrabalhoaprov/teletrabalhoaprov.component';
import { FeriasaprovComponent } from './components/pages/feriasaprov/feriasaprov.component';
import { AusenciaaprovComponent } from './components/pages/ausenciaaprov/ausenciaaprov.component';
import { AusenciaviewComponent } from './components/pages/ausenciaview/ausenciaview.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path:'userlist', component: UserlistComponent, canActivate: [AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path:'useredit/:id', component: UsereditComponent, canActivate: [AuthGuard]},
  {path:'userview/:id', component: UserviewComponent, canActivate: [AuthGuard]},
  {path:'ausenciaview/:id', component: AusenciaviewComponent, canActivate: [AuthGuard]},
  {path:'teletrabalho', component: TeletrabalhoComponent, canActivate: [AuthGuard]},
  {path:'ferias', component: FeriasComponent, canActivate: [AuthGuard]},
  {path:'ausencias', component: AusenciasComponent, canActivate: [AuthGuard]},
  {path:'teletrabalhoaprov', component: TeletrabalhoaprovComponent, canActivate: [AuthGuard]},
  {path:'feriasaprov', component: FeriasaprovComponent, canActivate: [AuthGuard]},
  {path:'ausenciasaprov', component: AusenciaaprovComponent, canActivate: [AuthGuard]},

  {path:'forbidden', component:ForbiddenPageComponent},
  {path:'**', pathMatch: 'full', component: PageNotFoudComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
