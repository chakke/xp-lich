import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureUtils } from '../../providers/departure/departure-utils';
import { ScrollItems, ScrollOption } from '../../providers/common/scroll-controller';
import { AppModule } from '../../providers/app-module';
import { DepartureTabsPage } from '../tabs/departure-tabs';

/**
 * Generated class for the TuviTrondoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tuvi-trondoi',
  templateUrl: 'tuvi-trondoi.html',
})
export class TuviTrondoiPage {
  page_title: string = "Tử Vi Trọn Đời";
  divID: string[] = ["scroll-gioitinh","scroll-date", "scroll-month", "scroll-year"];

  constructor(
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TuviTrondoiPage');
  }
  ionViewDidEnter() {
    
    this.createEventListeners();
  }

  isLoadData: boolean = false;
  loadData() {
  if (!this.isLoadData) {
      this.mAppModule.loadTuViTronDoiDataJSON().then(
        data => {
          this.isLoadData = true;
        }
      ).catch((error) => { })
    }
  }

  goToViewDetail(dd, mm, yy, gioitinh) {
    var key = DepartureUtils.getSexagesimalCycleByYear(dd, mm, yy);
    this.mAppModule.getDeitailTuViTronDoi(key, gioitinh).then(
      data => {
        // push page 
        // console.log(data);
        this.navCtrl.push("TuviTrondoiDetailPage",{data: data});
        
      }
    ).catch((error) => {
      // log error!
    })
  }

  gioitinh: number = 0;
  active(number) {
    this.gioitinh = number;
  }

  mEventsCreated: boolean = false;
  mScrollItems: Array<ScrollItems> = [];
  mCenterIndexs: Array<number> = [0, 0, 0, 0];
  mDayDatas: Array<number> = [];
  mMonthDatas: Array<number> = [];
  mYearDatas: Array<number> = [];
  mMaxSolarDay: number = 31;

  getNumberOfScrollingByTouch() {
    let numberScroll = 0;
    for (let scroll of this.mScrollItems) {
      if (scroll.isScrollingByTouch()) numberScroll++;
    }
    return numberScroll;
  }

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
        if(i==0){
          let scrollOptions: ScrollOption = {
            alpha: 0.2,
            epsilon: 1,
            callback: () => { }
          };
          AppModule.getInstance().getScrollController().doScroll(this.divID[i],this.mScrollItems[i].getScrollOfItemIndex(this.mCenterIndexs[0]),scrollOptions);
        }
        let dd = this.mDayDatas[this.mCenterIndexs[1]];
        let mm = this.mMonthDatas[this.mCenterIndexs[2]];
        let yy = this.mYearDatas[this.mCenterIndexs[3]];
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

  closeView(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot("DepartureMorePage");
    }
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

  scrollEnd(dd: number, mm: number, yy: number) {

    this.mMaxSolarDay = DepartureUtils.getDaysInMonth(mm - 1, yy);

    if (dd > this.mMaxSolarDay) dd = this.mMaxSolarDay;

    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };

    this.mCenterIndexs[1] = this.getDateIndex(dd);
    this.mCenterIndexs[2] = this.getMonthIndex(mm);
    this.mCenterIndexs[3] = this.getYearIndex(yy);
    
    AppModule.getInstance().getScrollController().doScroll(this.divID[1], this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[2], this.mScrollItems[2].getScrollOfItemIndex(this.mCenterIndexs[2]), scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[3], this.mScrollItems[3].getScrollOfItemIndex(this.mCenterIndexs[3]), scrollOptions);
    
  }

  viewDetail(){
    var dd = this.mDayDatas[this.mCenterIndexs[1]];    
    var mm = this.mMonthDatas[this.mCenterIndexs[2]];    
    var yy = this.mYearDatas[this.mCenterIndexs[3]];
    this.gioitinh = this.mCenterIndexs[0];    
    this.goToViewDetail(dd,mm,yy,this.gioitinh);
  }

  goToDay(){
    let date = new Date();
    this.mCenterIndexs[0] = 0;
    this.mCenterIndexs[1] = this.getDateIndex(date.getDate());
    this.mCenterIndexs[2] = this.getMonthIndex(date.getMonth() +  1);
    this.mCenterIndexs[3] = this.getYearIndex(date.getFullYear());

    this.mScrollItems[1].mElement.scrollTop = this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]);
    this.mScrollItems[2].mElement.scrollTop = this.mScrollItems[2].getScrollOfItemIndex(this.mCenterIndexs[2]);
    this.mScrollItems[3].mElement.scrollTop = this.mScrollItems[3].getScrollOfItemIndex(this.mCenterIndexs[3]);
    
  }

}
