import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StarterComponent } from './starter/starter.component';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { ChatSettingsComponent } from './chat-settings/chat-settings.component';
import { SettingsTableComponent } from "../share/settings-table/settings-table.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { TemplateComponent } from '../share/template/template.component';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { NgxEchartsModule } from 'ngx-echarts';
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppLineChartComponent } from './charts/line/line.component';
@NgModule({
    declarations: [
        ChatSettingsComponent,
        DashboardComponent,
        TemplateComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RouterModule.forChild(PagesRoutes),
        StarterComponent,
        SettingsTableComponent,
        GridsterComponent,
        GridsterItemComponent,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        }),
      TablerIconsModule.pick(TablerIcons),
      AppLineChartComponent

    ]
})
export class PagesModule {}
