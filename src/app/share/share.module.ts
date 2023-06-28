import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { NgxEchartsModule } from 'ngx-echarts';
// import { TemplateComponent } from './template/template.component';

import {
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType
} from 'angular-gridster2';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    GridsterComponent,
    GridsterItemComponent,
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule { }
