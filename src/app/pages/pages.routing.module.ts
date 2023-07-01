import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsWidgetsComponent } from './settings-widgets/settings-widgets.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
    }
  },
  {
    path: 'settings-widgets',
    component: SettingsWidgetsComponent,
    data: {
      title: 'Settings Widgets',
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    }
  }
];
