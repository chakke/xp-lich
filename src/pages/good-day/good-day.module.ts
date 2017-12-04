import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodDayPage } from './good-day';

@NgModule({
  declarations: [
    GoodDayPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodDayPage),
  ],
})
export class GoodDayPageModule {}
