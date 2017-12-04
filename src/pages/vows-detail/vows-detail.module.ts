import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VowsDetailPage } from './vows-detail';

@NgModule({
  declarations: [
    VowsDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(VowsDetailPage),
  ],
})
export class VowsDetailPageModule {}
