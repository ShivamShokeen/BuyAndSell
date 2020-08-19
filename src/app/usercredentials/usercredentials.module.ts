import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsercredentialsPageRoutingModule } from './usercredentials-routing.module';

import { UsercredentialsPage } from './usercredentials.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsercredentialsPageRoutingModule
  ],
  declarations: [UsercredentialsPage]
})
export class UsercredentialsPageModule {}
