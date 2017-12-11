import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DepartureModule } from "../providers/departure/departure";
import { HttpService } from "../providers/http-service";
import { DeviceInfoProvider } from "../providers/device-info/device-info";
import { HttpModule } from "@angular/http";

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree } from '@ionic-native/admob-free';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    DepartureTabsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      pageTransition: "ios-transition"
    }),
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DepartureTabsPage,

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DepartureModule,
    HttpService,
    DeviceInfoProvider,
    AdMobFree,
    GoogleAnalytics,
    Keyboard
  ]
})
export class AppModule { }
