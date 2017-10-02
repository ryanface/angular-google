import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardStudentsComponent } from "./card-students.component";
import { CardStudentsRoutingModule } from "./card-students-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardStudentsRoutingModule,
    FilterListModule,
  ],
  declarations: [ CardStudentsComponent ],
  exports: [ CardStudentsComponent ]
})
export class CardStudentsModule { }
