import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateComponent } from './template.component';
import { StarterComponent } from 'src/app/pages/starter/starter.component';
import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { NgxEchartsModule } from 'ngx-echarts';
import { TablerIconsModule } from 'angular-tabler-icons';
import { AppLineChartComponent } from 'src/app/pages/charts/line/line.component';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { SettingsRoutes } from 'src/app/pages/settings/settings.routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TemplateComponent,
  ],
  imports: [
    CommonModule,
    StarterComponent,
        GridsterComponent,
        GridsterItemComponent,
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts')
        }),
      TablerIconsModule.pick(TablerIcons),
      MaterialModule,
      AppLineChartComponent,
      RouterModule.forChild(SettingsRoutes),
    FormsModule,


  ],
  exports: [
    TemplateComponent
  ]
})
export class TemplateModule { }
