import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaminOtp} from "./otp";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TaminOtp
  ],
  exports: [
    TaminOtp
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class OtpModule {
}
