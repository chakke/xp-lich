import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule} from "@angular/http";
import { MyApp } from './app.component';
import { AppControllerProvider } from '../providers/app-controller/app-controller';
import { CalendarExchangeModule } from '../providers/calendar-exchange/calendar-exchange';
import { AppUltilsProvider } from '../providers/app-ultils/app-ultils';
import { LoadDataProvider } from '../providers/load-data/load-data';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppControllerProvider,
    CalendarExchangeModule,
    AppUltilsProvider,
    LoadDataProvider,
  ]
})
export class AppModule {}
