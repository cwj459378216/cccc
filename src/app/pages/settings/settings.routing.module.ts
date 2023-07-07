import { Routes } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangeDahbosrdComponent } from './dashboard/change-dahbosrd/change-dahbosrd.component';

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
  {
    path: 'dashboard/add',
    component: ChangeDahbosrdComponent,
    data: {
      title: 'Add Dashboard'
    }
  },
  {
    path: 'dashboard/edit/:id',
    component: ChangeDahbosrdComponent,
    data: {
      title: 'Edit Dashboard'
    }
  }
]

