import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from "./filter-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ FilterListComponent ],
  exports: [ FilterListComponent ]
})
export class FilterListModule { }
