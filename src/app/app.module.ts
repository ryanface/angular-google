import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoadingModule } from './loading/loading.module';
import { ClassModule } from './class/class.module';
import { CardDetailsModule } from './card-details/card-details.module';
import { ActivityDetailsModule } from './activity-details/activity-details.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    LoadingModule,
    ClassModule,
    CardDetailsModule,
    ActivityDetailsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
