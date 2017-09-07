import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityDetailsComponent } from "./activity-details.component";
import { ActivityDetailsRoutingModule } from "./activity-details-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    ActivityDetailsRoutingModule,
    FilterListModule,
  ],
  declarations: [ ActivityDetailsComponent ],
  exports: [ ActivityDetailsComponent ]
})
export class ActivityDetailsModule { }
