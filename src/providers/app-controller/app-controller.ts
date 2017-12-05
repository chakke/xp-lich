import { Injectable } from '@angular/core';
import { CalendarExchangeModule } from '../calendar-exchange/calendar-exchange';
import { DDMMYYDays } from '../class/day';
import { BackgroundController } from './background-controller';

/*
  Generated class for the AppControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppControllerProvider {
  public mBackgroundController: BackgroundController;
  

  constructor(
    private calendarExchange: CalendarExchangeModule) {
    console.log('Hello AppControllerProvider Provider');
  }

  public convertSolarToLunar(dd:number, mm: number, yy: number) : DDMMYYDays{
    return this.calendarExchange.convertSolarToLunar(dd,mm,yy);
  }

  public convertLunarToSolar(dd:number,mm: number, yy: number) : DDMMYYDays{
    return this.calendarExchange.convertLunarToSolar(dd,mm,yy);
  }

  
}
