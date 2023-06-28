import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
    }
  },
  {
    path: 'chat-settings',
    component: ChatSettingsComponent,
    data: {
      title: 'Chat Settings',
    }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
    }
  },
];
