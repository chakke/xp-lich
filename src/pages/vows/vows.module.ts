import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VowsPage } from './vows';

@NgModule({
  declarations: [
    VowsPage,
  ],
  imports: [
    IonicPageModule.forChild(VowsPage),
  ],
})
export class VowsPageModule {}
