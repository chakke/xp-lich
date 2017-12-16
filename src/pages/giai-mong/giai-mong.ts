import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { AppModule } from '../../providers/app-module';
import { StatusBar } from '@ionic-native/status-bar';
import { ScrollOption, ScrollItems } from '../../providers/common/scroll-controller';
import { Utils } from '../../providers/app-utils';

export interface Letter {
  letter: string;
  index: number;
}

@IonicPage()
@Component({
  selector: 'page-giai-mong',
  templateUrl: 'giai-mong.html',
})
//#49627c
export class GiaiMongPage {
  @ViewChild('mongName') mongName: ElementRef;
  @ViewChild('mongContent') mongContent: ElementRef;
  row_height = 40;
  data:any;
  selectedIndex = 0;
  letters = new Array<Letter>();
  divID = ['scroll1', 'scroll2'];
  currentID: number = 0;
  timeoutID = [-1, -1];
  touchID = [false, false];

  constructor(
    private statusBar: StatusBar,
    private rd: Renderer2,
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.loadData();
  }
  closeView() {
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
      }else{
      this.navCtrl.setRoot("DepartureMorePage");
    }
  }
  loadData() {
    if (!this.data) {
      this.mAppModule.getGiaiMongDataJSON().then(
        data => {
          this.data = data;
          this.data = this.data.sort((a, b) => {
            let x = this.bodauTiengViet(a.mong_name);
            let y = this.bodauTiengViet(b.mong_name);
            if (x < y) { return -1; }
            if (x > y) { return 1; }
            return 0;
          });
          this.getLetter();
        }, error => { }
      )
    }
  }
  ionViewDidEnter() {
    if (!this.mAppModule.mIsOnIOSDevice) this.statusBar.backgroundColorByHexString("#274c7c");
    this.createEventListeners();
  }

  mEventsCreated: boolean = false;
  mScrollItems: Array<ScrollItems> = [];
  mCenterIndexs: Array<number> = [0, 0];


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
        if (i == 0) {
          this.scrollLetter();
        } else {
          this.scrollData();
        }
      });
      scrollItems.setCenterChangedListend((centerIndex) => {
        this.mCenterIndexs[i] = centerIndex;
      });
    }
  }

  scrollLetter() {
    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };
    
    let letter = this.letters[this.mCenterIndexs[0]];
    this.mCenterIndexs[1] = letter.index;

    AppModule.getInstance().getScrollController().doScroll(this.divID[0],this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]),scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[1],this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]),scrollOptions);
  }
  // */Tra ve vi tri cua ky tu trong mang letters 
  getLetterIndex(data: string) : number{
    var letter = Utils.bodauTiengViet(data.charAt(0)).toUpperCase();
    for(let i = 0; i< this.letters.length; i++){
      
      if(letter == this.letters[i].letter){
        return i;
      }
    }
    return 0;
  }

  scrollData() {
    let scrollOptions: ScrollOption = {
      alpha: 0.2,
      epsilon: 1,
      callback: () => { }
    };

    let data = this.data[this.mCenterIndexs[1]].mong_name;
    this.mCenterIndexs[0] = this.getLetterIndex(data);

    AppModule.getInstance().getScrollController().doScroll(this.divID[1],this.mScrollItems[1].getScrollOfItemIndex(this.mCenterIndexs[1]),scrollOptions);
    AppModule.getInstance().getScrollController().doScroll(this.divID[0],this.mScrollItems[0].getScrollOfItemIndex(this.mCenterIndexs[0]),scrollOptions);
  }

  bodauTiengViet(str: string): string {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // str = str.replace(/\W+/g, ' ');
    // str = str.replace(/\s/g, '-');
    return str;
  }
  checkLetter(lettter: string): boolean {
    for (let i = 0; i < this.letters.length; i++) {
      if (lettter == this.letters[i].letter) {
        return true;
      }
    }
    return false;
  }
  getLetter() {
    for (let i = 0; i < this.data.length; i++) {
      let letter = this.bodauTiengViet(this.data[i].mong_name.charAt(0)).toUpperCase();
      if (i == 0) {
        this.letters.push({
          letter: letter,
          index: 0
        });
      }
      if (!this.checkLetter(letter)) {
        this.letters.push({
          letter: letter,
          index: i
        });
      }
    }
  }
  isClickView: boolean = false;
  viewDetail() {
    this.navCtrl.push("GiaiMongDetailPage", { data: this.data[this.mCenterIndexs[1]] });
    // this.rd.addClass(this.mongContent.nativeElement,"fadeInUp");
  }
}
