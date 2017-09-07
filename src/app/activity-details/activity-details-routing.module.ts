import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityDetailsComponent } from './activity-details.component';

@NgModule({
    imports:[
      RouterModule.forRoot([
        { path: 'activity-details/:id', component: ActivityDetailsComponent },
     ])
    ],
    exports:[
      RouterModule
    ]

})

export class ActivityDetailsRoutingModule{}
