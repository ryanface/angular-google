import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterListComponent } from "./filter-list.component";
import { FilterRoutingModule } from "./filter-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FilterRoutingModule
  ],
  declarations: [ FilterListComponent ],
  exports: [ FilterListComponent ]
})
export class FilterListModule { }
