import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupertabPage } from './supertab';
import { SharedModule } from '../../app/share-module';


@NgModule({
  declarations: [
    // SupertabPage,
  ],
  imports: [
    IonicPageModule.forChild(SupertabPage),
    // SharedModule
  ],
})
export class SupertabPageModule {}
