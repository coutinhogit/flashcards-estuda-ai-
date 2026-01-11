import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard/dashboard';
import { FlashCardComponent } from './features/study-session/components/flash-card/flash-card';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'study/:id', component: FlashCardComponent },
  
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];