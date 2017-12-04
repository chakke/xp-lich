import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodDayDetailPage } from './good-day-detail';

@NgModule({
  declarations: [
    GoodDayDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodDayDetailPage),
  ],
})
export class GoodDayDetailPageModule {}
