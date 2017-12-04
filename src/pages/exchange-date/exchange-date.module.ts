import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExchangeDatePage } from './exchange-date';

@NgModule({
  declarations: [
    ExchangeDatePage,
  ],
  imports: [
    IonicPageModule.forChild(ExchangeDatePage),
  ],
})
export class ExchangeDatePageModule {}
