import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter/starter.component';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from '../share/template/template.component';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { NgxEchartsModule } from 'ngx-echarts';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppLineChartComponent } from './charts/line/line.component';
import { SettingsWidgetsComponent } from './settings-widgets/settings-widgets.component';
import { DataTablesModule } from 'angular-datatables';
import { ListTableComponent } from '../share/list-table/list-table.component';



@NgModule({
    declarations: [
        DashboardComponent,
        TemplateComponent,
        SettingsWidgetsComponent,
        ListTableComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RouterModule.forChild(PagesRoutes),
        StarterComponent,
        GridsterComponent,
        GridsterItemComponent,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        }),
      TablerIconsModule.pick(TablerIcons),
      AppLineChartComponent,
      ReactiveFormsModule,
      DataTablesModule

    ]
})
export class PagesModule {}
