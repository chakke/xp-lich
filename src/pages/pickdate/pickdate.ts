import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DepartureObject } from "../../providers/departure/class/departure-object";
import { DepartureModule } from "../../providers/departure/departure";

import { AppModule } from "../../providers/app-module";
import { ScrollItems, ScrollOption } from '../../providers/common/scroll-controller';
import { DepartureUtils } from '../../providers/departure/departure-utils';
/**
 * Generated class for the PickdatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pickdate',
  templateUrl: 'pickdate.html',
})
export class PickdatePage {
  rowHeight = 45;//height of each row in px; Match to css; 
  ipadrowHeight = 80;//height of each row in px; Match to css; 
  isIpadDevices: boolean = false;
  mToday: Date;
  submit_button = <HTMLElement>document.getElementById("submit");
  selectedDate: DepartureObject;
  solar_date = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private mDepartureModule: DepartureModule,
  ) {
    for (let i = 1; i <= 31; i++) {
      this.mDayDatas.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.mMonthDatas.push(i);
    }
    for (let i = 1900; i <= 2200; i++) {
      this.mYearDatas.push(i);
    }
  }
  ionViewDidEnter() {
    this.createEventListeners();
    // this.mAppModule.showAdvertisement();
  }
  getNumberOfScrollingByTouch() {
    let numberScroll = 0;
    for (let scroll of this.mScrollItems) {
      if (scroll.isScrollingByTouch()) numberScroll++;
    }
    return numberScroll;
  }
  mEventsCreated: boolean = false;
  mScrollItems: Array<ScrollItems> = [];
  mCenterIndexs: Array<number> = [0, 0, 0];
  mMaxSolarDay: number = 31;
  divID = ["div1", "div2", "div3"];
  mDayDatas: Array<number> = [];
  mMonthDatas: Array<number> = [];
  mYearDatas: Array<number> = [];

  createEventListeners() {
    if (this.mEventsCreated) return;
    this.mEventsCreated = true;
    for (let i = 0; i < this.divID.length; i++) {
      let scrollItems = new ScrollItems(this.divID[i]);
      scrollItems.createListener();
      this.mScrollItems.push(scrollItems);
      scrollItems.setScrollEndListener((scrollTop) => {
        if (this.getNumberOfScrollingByTouch() != 1) {
          this.mCenterIndexs[i] = scrollItems.getCurrentFocusElement(true);
          return;
        }
        let dd = this.mDayDatas[this.mCenterIndexs[0]];
        let mm = this.mMonthDatas[this.mCenterIndexs[1]];
        let yy = this.mYearDatas[this.mCenterIndexs[2]];
        this.scrollEnd(dd, mm, yy);
      });

      scrollItems.setCenterChangedListend((centerIndex) => {
        this.mCenterIndexs[i] = centerIndex;
        if (i == 1) {
          this.mMaxSolarDay = DepartureUtils.getDaysInMonth(this.mMonthDatas[this.mCenterIndexs[1]] - 1, this.mYearDatas[this.mCenterIndexs[2]]);
        }
      });
    }

    this.goToDay();

  }
  getDateIndex(date: number): number {
    for (let i = 0; i < this.mDayDatas.length; i++) {
      if (date == this.mDayDatas[i]) return i;
    }
    return 0;
  }
  getMonthIndex(month: number): number {
    for (let i = 0; i < this.mMonthDatas.length; i++) {
      if (month == this.mMonthDatas[i]) return i;
    }
    return 0;
  }
  getYearIndex(year: number): number {
    for (let i = 0; i < this.mYearDatas.length; i++) {
      if (year == this.mYearDatas[i]) return i;
    }
    return 0;
  }
  scrollEnd(dd: number, mm: number, yy: number) {
    this.mMaxSolarDay = DepartureUtils.getDaysInMonth(mm - 1, yy);
    if (dd > this.mMaxSolarDay) dd = this.mMaxSolarDay;

    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };
    this.mCenterIndexs[0] = this.getDateIndex(dd);
    this.mCenterIndexs[1] = this.getMonthIndex(mm);
    this.mCenterIndexs[2] = this.getYearIndex(yy);

    AppModule.getInstance().getScrollController().doScroll(this.divID[0], this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[1], this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[2], this.mScrollItems[2].getScrollOfItemIndex(this.mCenterIndexs[2]), scrollOptions);

  }
  goToDay() {
    this.mToday = new Date();
    this.mMaxSolarDay = DepartureUtils.getDaysInMonth(this.mToday.getMonth(), this.mToday.getFullYear());

    this.mCenterIndexs[0] = this.getDateIndex(this.mToday.getDate());
    this.mCenterIndexs[1] = this.getMonthIndex(this.mToday.getMonth() + 1);
    this.mCenterIndexs[2] = this.getYearIndex(this.mToday.getFullYear());

    this.mScrollItems[0].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]);
    this.mScrollItems[1].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[1]);
    this.mScrollItems[2].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[2]);

  }

  getSelectedDate() {
    let dd: number = this.mDayDatas[this.mCenterIndexs[0]];
    let mm: number = this.mMonthDatas[this.mCenterIndexs[1]];
    let yy: number = this.mYearDatas[this.mCenterIndexs[2]];
    
    let dateStr = yy + "-" + ((mm < 10) ? "0" : "") + mm + "-" + ((dd < 10) ? "0" : "") + dd;
    
    this.selectedDate = new DepartureObject(new Date(dateStr));

    this.mDepartureModule.updateDepartureInfo([this.selectedDate]);
    
  }
  closeSolarDate() {
    this.viewCtrl.dismiss({}, "", {
      animate: false
    });
  }

  getSolarDate(){
    this.getSelectedDate();
    this.viewCtrl.dismiss(this.selectedDate,"",{
      animate: false
    });
  }

}
