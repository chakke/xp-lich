import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureUtils } from '../../providers/departure/departure-utils';
import { DepartureObject } from '../../providers/departure/class/departure-object';
import { AppModule } from "../../providers/app-module";
import { ScrollItems, ScrollOption } from "../../providers/common/scroll-controller";
import { StatusBar } from '@ionic-native/status-bar';
import { AppLoop } from "../../providers/app-loop";
import { Utils } from "../../providers/app-utils";
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@IonicPage()
@Component({
  selector: 'page-departure-changedate',
  templateUrl: 'departure-changedate.html',
})

export class DepartureChangeDatePage {

  rowHeight: string = "45px";
  rowContainer: string = "135px";
  mDayDatas: Array<number> = [];
  mMonthDatas: Array<number> = [];
  mYearDatas: Array<number> = [];
  mDepartureObject: DepartureObject;
  mScrollItems: Array<ScrollItems> = [];
  mCenterIndexs: Array<number> = [0, 0, 0, 0, 0, 0];
  mMaxSolarDay: number = 31;
  mMaxLunarDay: number = 30;
  mToday: Date = new Date();
  mTodayString: String = "";
  divID = ["solarDay", "solarMonth", "solarYear", "lunarDay", "lunarMonth", "lunarYear"]

  constructor(
    private mModalController : ModalController,
    private mNavController: NavController,
    private mAppModule: DepartureModule,
    private mStatusBar: StatusBar
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
    this.mTodayString = Utils.getViewDate(this.mToday);
    this.mDepartureObject = new DepartureObject(this.mToday);
    this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
    this.rowHeight = Math.floor(screen.height * 0.06) + "px";
    this.rowContainer = Math.floor(screen.height * 0.06)*3 + "px";
  }


  ionViewDidEnter() {
    this.mNavController.swipeBackEnabled = false;
    this.createEventListeners();
    if (!this.mAppModule.mIsOnIOSDevice) { this.mStatusBar.backgroundColorByHexString("#20c0e1") };
    this.mAppModule.showAdvertisement();
  }
  ionViewDidLeave() {
    //  this.mNavController.swipeBackEnabled = true;
  }

  getNumberOfScrollingByTouch() {
    let numberScroll = 0;
    for (let scroll of this.mScrollItems) {
      if (scroll.isScrollingByTouch()) numberScroll++;
    }
    return numberScroll;
  }
  mEventsCreated: boolean = false;

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
        if (i <= 2) {
          let dd = this.mDayDatas[this.mCenterIndexs[0]];
          let mm = this.mMonthDatas[this.mCenterIndexs[1]];
          let yy = this.mYearDatas[this.mCenterIndexs[2]];
          this.setSolarDay(dd, mm, yy);
        } else {
          let dd = this.mDayDatas[this.mCenterIndexs[3]];
          let mm = this.mMonthDatas[this.mCenterIndexs[4]];
          let yy = this.mYearDatas[this.mCenterIndexs[5]];
          this.setLunarDay(dd, mm, yy);
        }
      });

      scrollItems.setCenterChangedListend((centerIndex) => {
        this.mCenterIndexs[i] = centerIndex;
        if (i == 1) {
          this.mMaxSolarDay = DepartureUtils.getDaysInMonth(this.mMonthDatas[this.mCenterIndexs[1]] - 1, this.mYearDatas[this.mCenterIndexs[2]]);
        }
      });
    }

    this.onCreateCalendar();

  }

  onClickViewDetail() {
    this.mNavController.push("DayDetailPage", {
      dd: this.mDayDatas[this.mCenterIndexs[0]],
      mm: this.mMonthDatas[this.mCenterIndexs[1]],
      yy: this.mYearDatas[this.mCenterIndexs[2]]
    })
  }

  onClickPickDate(){
    let modal = this.mModalController.create("PickdatePage");
    modal.onDidDismiss((data: DepartureObject) => {
      if (data && data.date) {
        setTimeout(() => {
          this.mDepartureObject.setDate(data.date.getDate(), data.date.getMonth(), data.date.getFullYear());
          this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
          this.setSolarDay(data.date.getDate(), data.date.getMonth() + 1, data.date.getFullYear());
        }, 100);
      }
    })
    modal.present({
      animate: false
    });
  }

  onClickToday() {
    this.mDepartureObject.setDate(this.mToday.getDate(), this.mToday.getMonth(), this.mToday.getFullYear());
    this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
    this.setSolarDay(this.mToday.getDate(), this.mToday.getMonth() + 1, this.mToday.getFullYear());
  }

  /*Trả về index của date trong datas*/
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

  onCreateCalendar() {

    this.mMaxSolarDay = DepartureUtils.getDaysInMonth(this.mToday.getMonth(), this.mToday.getFullYear());

    let lunar = DepartureUtils.convertSolarToLunar(this.mToday.getDate(), this.mToday.getMonth() + 1, this.mToday.getFullYear());



    // this.mScrollItems[0].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.getDateIndex(this.mToday.getDate()));
    // this.mScrollItems[1].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.getMonthIndex(this.mToday.getMonth() + 1));
    // this.mScrollItems[2].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.getYearIndex(this.mToday.getFullYear()));

    // this.mScrollItems[3].mElement.scrollTop = this.mScrollItems[3].getScrollOfItemIndex(this.getDateIndex(lunar[0]));
    // this.mScrollItems[4].mElement.scrollTop = this.mScrollItems[4].getScrollOfItemIndex(this.getMonthIndex(lunar[1]));
    // this.mScrollItems[5].mElement.scrollTop = this.mScrollItems[5].getScrollOfItemIndex(this.getYearIndex(lunar[2]));



    this.mCenterIndexs[0] = this.getDateIndex(this.mToday.getDate());
    this.mCenterIndexs[1] = this.getMonthIndex(this.mToday.getMonth() + 1);
    this.mCenterIndexs[2] = this.getYearIndex(this.mToday.getFullYear());
    this.mCenterIndexs[3] = this.getDateIndex(lunar[0]);
    this.mCenterIndexs[4] = this.getMonthIndex(lunar[1]);
    this.mCenterIndexs[5] = this.getYearIndex(lunar[2]);

    this.mScrollItems[0].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]);
    this.mScrollItems[1].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[1]);
    this.mScrollItems[2].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[2]);

    this.mScrollItems[3].mElement.scrollTop = this.mScrollItems[3].getScrollOfItemIndex(this.mCenterIndexs[3]);
    this.mScrollItems[4].mElement.scrollTop = this.mScrollItems[4].getScrollOfItemIndex(this.mCenterIndexs[4]);
    this.mScrollItems[5].mElement.scrollTop = this.mScrollItems[5].getScrollOfItemIndex(this.mCenterIndexs[5]);


    this.mDepartureObject.setDate(this.mToday.getDate(), this.mToday.getMonth(), this.mToday.getFullYear());
    this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
  }

  setSolarDay(dd: number, mm: number, yy: number) {

    this.mMaxSolarDay = DepartureUtils.getDaysInMonth(mm - 1, yy);

    if (dd > this.mMaxSolarDay) dd = this.mMaxSolarDay;
    let lunar = DepartureUtils.convertSolarToLunar(dd, mm, yy);

    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };

    this.mCenterIndexs[0] = this.getDateIndex(dd);
    this.mCenterIndexs[1] = this.getMonthIndex(mm);
    this.mCenterIndexs[2] = this.getYearIndex(yy);
    this.mCenterIndexs[3] = this.getDateIndex(lunar[0]);
    this.mCenterIndexs[4] = this.getMonthIndex(lunar[1]);
    this.mCenterIndexs[5] = this.getYearIndex(lunar[2]);

    AppModule.getInstance().getScrollController().doScroll(this.divID[0], this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[1], this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[2], this.mScrollItems[2].getScrollOfItemIndex(this.mCenterIndexs[2]), scrollOptions);

    AppModule.getInstance().getScrollController().doScroll(this.divID[3], this.mScrollItems[3].getScrollOfItemIndex(this.mCenterIndexs[3]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[4], this.mScrollItems[4].getScrollOfItemIndex(this.mCenterIndexs[4]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[5], this.mScrollItems[5].getScrollOfItemIndex(this.mCenterIndexs[5]), scrollOptions);

    this.mDepartureObject.setDate(dd, mm - 1, yy);
    this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
  }
  setLunarDay(dd: number, mm: number, yy: number) {
    if (dd > this.mMaxLunarDay) dd = this.mMaxLunarDay;
    let solar = DepartureUtils.convertLunarToSolar(dd, mm, yy);

    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };

    this.mCenterIndexs[0] = this.getDateIndex(solar[0]);
    this.mCenterIndexs[1] = this.getMonthIndex(solar[1]);
    this.mCenterIndexs[2] = this.getYearIndex(solar[2]);
    this.mCenterIndexs[3] = this.getDateIndex(dd);
    this.mCenterIndexs[4] = this.getMonthIndex(mm);
    this.mCenterIndexs[5] = this.getYearIndex(yy);

    AppModule.getInstance().getScrollController().doScroll(this.divID[0], this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[1], this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[2], this.mScrollItems[2].getScrollOfItemIndex(this.mCenterIndexs[2]), scrollOptions);

    AppModule.getInstance().getScrollController().doScroll(this.divID[3], this.mScrollItems[3].getScrollOfItemIndex(this.mCenterIndexs[3]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[4], this.mScrollItems[4].getScrollOfItemIndex(this.mCenterIndexs[4]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[5], this.mScrollItems[5].getScrollOfItemIndex(this.mCenterIndexs[5]), scrollOptions);


    this.mDepartureObject.setDate(solar[0], solar[1] - 1, solar[2]);
    this.mAppModule.updateDepartureInfo([this.mDepartureObject]);
  }

  openMenu(){
    let ele = document.getElementById("overlay-change");
    if(ele)ele.style.display = "block";
  }


}
