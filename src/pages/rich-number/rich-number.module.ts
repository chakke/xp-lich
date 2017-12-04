import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RichNumberPage } from './rich-number';

@NgModule({
  declarations: [
    RichNumberPage,
  ],
  imports: [
    IonicPageModule.forChild(RichNumberPage),
  ],
})
export class RichNumberPageModule {}
