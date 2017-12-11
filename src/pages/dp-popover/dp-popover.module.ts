import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DpPopoverPage } from './dp-popover';

@NgModule({
  declarations: [
    DpPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(DpPopoverPage),
  ],
})
export class DpPopoverPageModule {}
