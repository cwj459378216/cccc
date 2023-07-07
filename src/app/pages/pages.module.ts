import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
    ],

})
export class PagesModule {}
