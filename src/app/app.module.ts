import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DepartureModule } from "../providers/departure/departure";
import { HttpService } from "../providers/http-service";
import { DeviceInfoProvider } from "../providers/device-info/device-info";
import { HttpModule } from "@angular/http";

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { AdMobFree } from '@ionic-native/admob-free';
import { Keyboard } from '@ionic-native/keyboard';

import { SuperTabsModule } from 'ionic2-super-tabs';
import { DepartureCalendarPage } from '../pages/calendar/departure-calendar';
import { SupertabPage } from '../pages/supertab/supertab';
import { ZodiacDetailPage } from '../pages/zodiac-detail/zodiac-detail';
import { Tuvi_12congiapDetailPage } from '../pages/tuvi-12congiap-detail/tuvi-12congiap-detail';


@NgModule({
  declarations: [
    MyApp,
    SupertabPage,
    ZodiacDetailPage,
    Tuvi_12congiapDetailPage ,
    // GiaiMongDetailPage,
    // GiaiMongPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
      pageTransition: "ios-transition",
      menuType: "reveal",
      scrollAssist: false, 
      autoFocusAssist: false 
    }),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SupertabPage,
    ZodiacDetailPage ,
    Tuvi_12congiapDetailPage,
    // GiaiMongDetailPage,
    // GiaiMongPage,
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
