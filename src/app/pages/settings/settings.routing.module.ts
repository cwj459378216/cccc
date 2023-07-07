import { Routes } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const SettingsRoutes: Routes = [
  {
    path: 'widgets',
    component: WidgetsComponent,
    data: {
      title: 'Widgets',
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    }
  },
]

