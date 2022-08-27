import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/compat/auth-guard';
import { AdminGuard } from './core/guards/admin.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['/dashboard']);

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule), ...canActivate(redirectLoggedInToApp) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'generate-lead', loadChildren: () => import('./features/leads/lead.module').then(m => m.LeadModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: 'customers/:id', loadChildren: () => import('./features/customer/customer.module').then(m => m.CustomerModule), ...canActivate(redirectUnauthorizedToLogin)  },
  { path: 'search', loadChildren: () => import('./features/search/search.module').then(m => m.SearchModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'appointment', loadChildren: () => import('./features/appointment/appointment.module').then(m => m.AppointmentModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'leads', loadChildren: () => import('./features/leads/lead.module').then(m => m.LeadModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'calendar', loadChildren: () => import('./features/calendar/calendar-page.module').then(m => m.CalendarPageModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: 'walkthrough/:id', loadChildren: () => import('./features/estimator-walkthrough/walkthrough.module').then(m => m.WalkthroughModule), ...canActivate(redirectUnauthorizedToLogin) },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
