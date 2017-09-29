import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAnnouncementComponent } from "./card-announcement.component";
import { CardAnnouncementRoutingModule } from "./card-announcement-routing.module";
import { FilterListModule } from './filter-list/filter-list.module';

@NgModule({
  imports: [
    CommonModule,
    CardAnnouncementRoutingModule,
    FilterListModule,
  ],
  declarations: [ CardAnnouncementComponent ],
  exports: [ CardAnnouncementComponent ]
})
export class CardAnnouncementModule { }
