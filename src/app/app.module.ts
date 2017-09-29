import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoadingModule } from './loading/loading.module';
import { ClassModule } from './class/class.module';
import { CardDetailsModule } from './card-details/card-details.module';
import { ActivityDetailsModule } from './activity-details/activity-details.module';
import { CardAnnouncementModule } from './card-announcement/card-announcement.module';
import { GlobalDataService } from './globaldata.service';
import { AppService } from "./app.service";
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    LoadingModule,
    ClassModule,
    CardDetailsModule,
    ActivityDetailsModule,
    LoginModule,
    CardAnnouncementModule,
  ],
  providers: [GlobalDataService,AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
