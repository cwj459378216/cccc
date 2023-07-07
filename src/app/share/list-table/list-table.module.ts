import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTableComponent } from './list-table.component';
import { FromComponent } from './from/from.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    ListTableComponent,
    FromComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
    MaterialModule,

  ],
  exports: [
    ListTableComponent
  ]
})
export class ListTableModule { }
