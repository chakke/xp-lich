import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DepartureModule } from '../providers/departure/departure';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = "DepartureLoadingPage";

  constructor(
    private mAppModule: DepartureModule,
    platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
    });

  }
}
