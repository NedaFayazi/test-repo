import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OtpModule} from "./otp/otp.module";
import { LogInComponent } from './log-in/log-in.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OtpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
