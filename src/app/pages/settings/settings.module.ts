import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SettingsRoutes } from './settings.routing.module';
import { RouterModule } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { ListTableModule } from 'src/app/share/list-table/list-table.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangeDahbosrdComponent } from './dashboard/change-dahbosrd/change-dahbosrd.component';
import { TemplateModule } from 'src/app/share/template/template.module';



@NgModule({
  declarations: [
    WidgetsComponent,
    DashboardComponent,
    ChangeDahbosrdComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRoutes),
    ListTableModule,
    TemplateModule
  ],
  providers: [DatePipe],
})
export class SettingsModule { }
