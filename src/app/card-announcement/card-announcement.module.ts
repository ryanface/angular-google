import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardAnnouncementComponent } from "./card-announcement.component";
import { CardAnnouncementRoutingModule } from "./card-announcement-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CardAnnouncementRoutingModule,
    FilterListModule,
  ],
  declarations: [ CardAnnouncementComponent ],
  exports: [ CardAnnouncementComponent ]
})
export class CardAnnouncementModule { }
