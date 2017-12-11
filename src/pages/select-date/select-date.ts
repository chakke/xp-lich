import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { AppModule } from '../../providers/app-module';
import { StatusBar } from '@ionic-native/status-bar';
import { ScrollItems, ScrollOption } from '../../providers/common/scroll-controller';

/**
 * Generated class for the SelectDatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-date',
  templateUrl: 'select-date.html',
})
export class SelectDatePage {
  rowHeight = 40;
  data: any;
  isLoading: boolean = true;
  dayInMonth = [];
  years = [];
  timeOutID = [];
  numberMidder = [0, 0, 0];
  constructor(
    private mAppModule: DepartureModule,
    private statusBar: StatusBar,
    public navCtrl: NavController, public navParams: NavParams) {
    if (!this.mAppModule.mIsOnIOSDevice) this.statusBar.backgroundColorByHexString("#274c7c");
    for (let i = 1; i <= 12; i++) {
      this.dayInMonth.push(i);
    }
    for (let i = 1900; i < 2200; i++) {
      this.years.push(i);
    }
    this.onLoadData();
  } 

  onLoadData(){
    this.mAppModule.getSelectDateDataJSON().then(
      data => {
        this.data = data;
        this.isLoading = false;
        setTimeout(() => {
        this.createEventListeners();
    
        }, 300);
      }, error => { }
    )
  }

  ionViewDidLoad() {
    // this.addEventListener();
    // this.goToDay();
  }
  goToDay() {
    let date = new Date();
    this.mCenterIndexs[1] = this.getMonthIndex(date.getMonth() + 1);
    this.mCenterIndexs[2] = this.getYearIndex(date.getFullYear());
    
    this.mScrollItems[1].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[1]);
    this.mScrollItems[2].mElement.scrollTop = this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[2]);
  }
  mEventsCreated: boolean = false;
  mScrollItems: Array<ScrollItems> = [];
  mCenterIndexs: Array<number> = [0, 0, 0];
  divID = ["colum1", "colum2", "colum3"]

  // *Tra ve vi tri gia tri thang nam
  getMonthIndex(month: number): number {
    for (let i = 0; i < this.dayInMonth.length; i++) {
      if (month == this.dayInMonth[i]) return i;
    }
    return 0;
  }
  getYearIndex(year: number): number {
    for (let i = 0; i < this.years.length; i++) {
      if (year == this.years[i]) return i;
    }
    return 0;
  }


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
        this.scrollEnd(i);
      });
      scrollItems.setCenterChangedListend((centerIndex) => {
        this.mCenterIndexs[i] = centerIndex;
      });
    }
    this.goToDay();
    
  }

  scrollEnd(i) {
    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };

    AppModule.getInstance().getScrollController().doScroll(this.divID[i], this.mScrollItems[i].getScrollOfItemIndex(this.mCenterIndexs[i]), scrollOptions);
  }

  closeView() {
    this.navCtrl.pop();
  }

  viewDescription() {
    this.navCtrl.push("SelectDateDetailPage", {
      data: this.data[this.mCenterIndexs[0]],
      month: this.dayInMonth[this.mCenterIndexs[1]],
      year: this.years[this.mCenterIndexs[2]]
    })
  }

}
