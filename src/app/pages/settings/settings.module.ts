import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SettingsRoutes } from './settings.routing.module';
import { RouterModule } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { ListTableModule } from 'src/app/share/list-table/list-table.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    WidgetsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    ListTableModule
  ],
  providers: [DatePipe],
})
export class SettingsModule { }
