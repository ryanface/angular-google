import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardAnnouncementComponent } from './card-announcement.component';

@NgModule({
    imports:[
      RouterModule.forRoot([
        { path: 'card-announcement/:id', component: CardAnnouncementComponent },
     ])
    ],
    exports:[
      RouterModule
    ]

})

export class CardAnnouncementRoutingModule{}
