import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardDetailsComponent } from "./card-details.component";
import { CardDetailsRoutingModule } from "./card-details-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    CardDetailsRoutingModule,
    FilterListModule,
  ],
  declarations: [ CardDetailsComponent ],
  exports: [ CardDetailsComponent ]
})
export class CardDetailsModule { }
