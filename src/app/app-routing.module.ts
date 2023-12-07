import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginGuard } from './shared/loginGuard.service';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: '',redirectTo: 'login', pathMatch:'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify', component: VerifyEmailComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'dashboard',canActivate: [LoginGuard], component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
