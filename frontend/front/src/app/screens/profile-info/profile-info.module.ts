import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileInfoRoutingModule } from './profile-info-routing.module';
import { ProfileInfoComponent } from './profile-info.component';


@NgModule({
  declarations: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    ProfileInfoRoutingModule
  ]
})
export class ProfileInfoModule { }
