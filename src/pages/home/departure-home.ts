import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController, Platform } from 'ionic-angular';
import { AppController } from '../../providers/app-controller';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureObject } from "../../providers/departure/class/departure-object";
import { Background } from "../../providers/departure/controller/background-controller";
import { StatusBar } from '@ionic-native/status-bar';
import { DepartureUtils } from "../../providers/departure/departure-utils";
import { DanhNgon } from '../../providers/departure/interface/danhngon';
// import { AdMobPro } from '@ionic-native/admob-pro';
@IonicPage()
@Component({
  selector: 'page-departure-home',
  templateUrl: 'departure-home.html',
})
export class DepartureHomePage {
  mToday: Date = new Date();
  mBackground: Background = new Background();
  //thời gian hiện tại
  nowtime: any;
  //ngày thứ X trong tuần
  day_of_week: string = "";
  //ngày dương
  solarDate: number;
  //tháng dương
  solarMonth: number;
  //năm dương
  solarYear: number;
  //ngày âm
  lunarDate: number;
  //tháng âm
  lunarMonth: number;
  //năm âm
  lunarYear: number;
  //can chi của giờ
  sexagesimalCycleTime: string = "";
  //can chi của ngày
  sexagesimalCycleDate: string = "";
  //can chi của tháng
  sexagesimalCycleMonth: string = "";
  //can chi của năm:
  sexagesimalCycleYear: string = "";
  //dữ liệu về ngày xuất hành
  departureData: any;
  //dữ liệu về chi tiết ngày
  dayDetailData: any;
  //đữ liệu về chi tiết trực
  trucData: any;
  //dữ liệu về Tiết của ngày
  tietData: any;
  //dữ liệu về hướng xuất hành
  taiThan_hyThan: any;
  //dữ liệu sao tốt sao xấu
  saoTot_saoXau: any;
  //dữ liệu về ngày đặc biệt
  special_data: any;
  //tên của ngày theo lịch xuất hành
  name_of_date: string = "";
  //lời khuyên cho ngày:
  quote_of_date: string = "";
  //Danh ngon
  danhngon: DanhNgon;
  //góc quay cho div ở phần ngày dương
  degree: number = 0;
  //
  fg: any;
  //loading 
  isLoading: boolean = true;
  /* init all variable */

  mBackgroundAnimationEnable: boolean = true;
  constructor(
    private mPlatform: Platform,
    private navCtrl: NavController,
    private mAppModule: DepartureModule,
    private mMenuController: MenuController,
    private modalCtrl: ModalController,
    private statusBar: StatusBar,

  ) {

    this.solarDate = this.mToday.getDate();
    this.solarMonth = this.mToday.getMonth() + 1;
    this.solarYear = this.mToday.getFullYear();
    this.degree = 0;
    this.danhngon = {
      caudanhngon: "40 năm đầu của cuộc đời cho chúng ta đề tài và 40 năm sau cho chúng ta sự thuyết minh nó.",
      tacgia: "Schopenhauer"
    }
  }

  mHasEnter: boolean = false;
  ionViewWillLeave() {
    this.mBackgroundAnimationEnable = false;
  }
  danhNgondata: any;
  isLoaddanhNgon : boolean = true;
  ionViewDidEnter() {
    this.mBackgroundAnimationEnable = true;
    this.changeBackGroundStatusBar();
    if(!this.danhNgondata){
      this.mAppModule.getDanhNgonDataJSON().then(
        data=>{
          this.danhNgondata = data;
          this.isLoaddanhNgon = false;
          this.loadDanhNgon();
        },error=>{}
      )
    }

    if (!this.mHasEnter) {
      this.mHasEnter = true;
      setTimeout(() => {
        this.precacheBackgrounds();
      }, 2000);
      this.mMenuController.enable(false, "lottery");
      this.addCubeListener();
    }
    if (!this.dayDetailData) {
      this.mAppModule.getDayDetailDataJSON().then(
        data => {
          this.dayDetailData = data;
        }, error => { }
      )
    }
    if (!this.trucData) {
      this.mAppModule.getTrucDataJSON().then(
        data => {
          this.trucData = data;
        }, error => { }
      )
    }
    if (!this.tietData) {
      this.mAppModule.getTietDataJSON().then(
        data => {
          this.tietData = data;
        }, error => { }
      )
    }
    if (!this.taiThan_hyThan) {
      this.mAppModule.getTaiThanHyThanDataJSON().then(
        data => {
          this.taiThan_hyThan = data;
        }, error => { }
      )
    }
    if (!this.saoTot_saoXau) {
      this.mAppModule.getSaoTotSaoXauDataJSON().then(
        data => {
          this.saoTot_saoXau = data;
        }, error => { }
      )
    }
    if (!this.special_data) {
      this.mAppModule.getSpecialDataJSON().then(
        data => {
          this.special_data = data;
        }, error => { }
      )
    }
    if (!this.departureData) {
      this.mAppModule.getData().then(
        data => {
          this.departureData = data;
          this.onLoadedData();
        }, error => { }
      );
    }
  }

  loadDanhNgon(){
    this.danhngon = this.mAppModule.getDanhNgon(this.solarDate,this.solarMonth,this.solarYear);
  }

  onClickPreviousDay() {
    this.rotateLeft();
  }
  onClickNextDay() {
    this.rotateRight();
  }
  viewDayDetail() {
    this.navCtrl.push("DayDetailPage", {
      dd: this.solarDate,
      mm: this.solarMonth,
      yy: this.solarYear,
    });
    // this.mAppModule.showInterstitial();
  }
  onLoadedData() {
    this.getDayOfWeek();
    this.getLunarDateTime();
    this.getSexagesimalCycle();
    // this.getQuoteAndDayName();
    this.changeBackgroundImage();
    this.nowtime = new Date();
    this.sexagesimalCycleTime = this.mAppModule.getSexagesimalCycleByTime(this.solarDate, this.solarMonth, this.solarYear, this.nowtime.getHours());
    
    this.isLoading = false; 
  }
  onClickToDay() {
    this.solarDate = this.mToday.getDate();
    this.solarMonth = this.mToday.getMonth() + 1;
    this.solarYear = this.mToday.getFullYear();
    this.loadDanhNgon();
    this.getDayOfWeek();
    this.getLunarDateTime();
    this.getSexagesimalCycle();
    // this.getQuoteAndDayName();
    this.changeBackgroundImage();

    this.nowtime = new Date();
    this.sexagesimalCycleTime = this.mAppModule.getSexagesimalCycleByTime(this.solarDate, this.solarMonth, this.solarYear, this.nowtime.getHours());
    this.isLoading = false;
  }

  onClickHome() {
    //this.events.publish("HOME_PAGE");
    if (AppController.getInstance().getNavController()) {
      AppController.getInstance().getNavController().setRoot("StoreHomePage");
    }
  }
  //chuyển đổi ngày âm dương
  getLunarDateTime() {
    let lunarDateTime: any[];
    lunarDateTime = this.mAppModule.convertSolarToLunar(this.solarDate, this.solarMonth, this.solarYear);
    this.lunarDate = lunarDateTime[0];
    this.lunarMonth = lunarDateTime[1];
    this.lunarYear = lunarDateTime[2];
  }
  //tính can chi cho ngày tháng năm
  getSexagesimalCycle() {
    this.sexagesimalCycleDate = this.mAppModule.getSexagesimalCycleByDay(this.solarDate, this.solarMonth, this.solarYear);
    this.sexagesimalCycleMonth = this.mAppModule.getSexagesimalCycleByMonth(this.solarDate, this.solarMonth, this.solarYear);
    this.sexagesimalCycleYear = this.mAppModule.getSexagesimalCycleByYear(this.solarDate, this.solarMonth, this.solarYear);
  }
  //tính ngày thứ mấy trong tuần
  getDayOfWeek() {
    let day: number = new Date(this.solarMonth.toString() + "/" + this.solarDate.toString() + "/" + this.solarYear.toString()).getDay();
    switch (day) {
      case 0:
        this.day_of_week = "Chủ nhật";
        break;
      case 1:
        this.day_of_week = "Thứ hai";
        break;
      case 2:
        this.day_of_week = "Thứ ba";
        break;
      case 3:
        this.day_of_week = "Thứ tư";
        break;
      case 4:
        this.day_of_week = "Thứ năm";
        break;
      case 5:
        this.day_of_week = "Thứ sáu";
        break;
      case 6:
        this.day_of_week = "Thứ bảy";
        break;
    }
  }
  //lấy tên và lời khuyên cho ngày
  getQuoteAndDayName() {
    let data = this.mAppModule.getQuoteAndNameOfDay(this.lunarDate, this.lunarMonth, this.departureData);
    this.name_of_date = data[0].toString();
    this.quote_of_date = data[1].toString();
  }
  //quay phải
  rotateRight() {
    let cube = document.getElementById("cube");
    if (!cube) return;
    cube.style.transform = "translateZ( -100px) rotateY( " + (this.degree -= 90) + "deg)";
    setTimeout(() => {
      this.forwardNextDate();
      this.loadDanhNgon();
      this.getDayOfWeek();
      this.getLunarDateTime();
      // this.getQuoteAndDayName();
      this.changeBackgroundImage();
      this.getSexagesimalCycle();
      
    }, 100);
  }
  //quay trái
  rotateLeft() {
    
    let cube = document.getElementById("cube");
    if (!cube) return;
    cube.style.transform = "translateZ( -100px) rotateY( " + (this.degree += 90) + "deg)";
    setTimeout(() => {
      this.backtoPreviousDate();
      this.loadDanhNgon();
      this.getDayOfWeek();
      this.getLunarDateTime();
      // this.getQuoteAndDayName();
      this.changeBackgroundImage();
      this.getSexagesimalCycle();
      
    }, 100);
  }



  //tiến về ngày kế tiếp
  forwardNextDate() {
    // let day_numbers_of_month = DepartureUtils  this.getDayNumbersInOneMonth();
    this.solarDate++;
    let maxDayOfMonth: number = DepartureUtils.getDaysInMonth(this.solarMonth - 1, this.solarYear);
    if (this.solarDate > maxDayOfMonth) {
      this.solarMonth++;
      if (this.solarMonth > 12) {
        this.solarMonth = 1;
        this.solarYear++;
      }
      this.solarDate = 1;
    }
  }
  //lùi về ngày hôm trước
  backtoPreviousDate() {
    this.solarDate--;
    if (this.solarDate < 1) {
      this.solarMonth--;
      if (this.solarMonth < 1) {
        this.solarMonth = 12;
        this.solarYear--;
      }
      this.solarDate = DepartureUtils.getDaysInMonth(this.solarMonth - 1, this.solarYear);
    }
  }

  //touch move event cho cube
  addCubeListener() {
    let cube = document.getElementById('iAppContent');
    if (!cube) return;
    let startx = 0;
    let dist = 0;
    cube.addEventListener('touchstart', (e) => {
      let touchobj = e.changedTouches[0] // reference first touch point (ie: first finger)
      startx = touchobj.clientX // get x position of touch point relative to left edge of browser
    }, false);

    cube.addEventListener('touchmove', (e) => {
      //let touchobj = e.changedTouches[0]; // reference first touch point for this event
    }, false);

    cube.addEventListener('touchend', (e) => {
      this.mAppModule.showAdvertisement();
      var touchobj = e.changedTouches[0]; // reference first touch point for this event
      dist = touchobj.clientX - startx;
      if (dist > 20) {
        this.rotateLeft();
      } else if (dist < -20) {
        this.rotateRight();
      }
    }, false);

    cube.addEventListener('touchcancel', (e) => {
      var touchobj = e.changedTouches[0]; // reference first touch point for this event
      dist = touchobj.clientX - startx;
      if (dist > 20) {
        this.rotateLeft();
      } else if (dist < -20) {
        this.rotateRight();
      }
    }, false);
  }

  // thay đổi background khi đổi ngày
  changeBackgroundImage() {
    this.mBackground = this.mAppModule.getBackgroundController().getBackgroundImage(this.lunarDate, this.lunarMonth, this.lunarYear);
    let pageContent = document.getElementById("homepage-content");
    if (pageContent) {
      pageContent.style.backgroundImage = "url(" + this.mBackground.getImageUrl() + ")";
    }
    this.changeBackGroundStatusBar();
  }
  changeBackGroundStatusBar() {
    if (!this.mAppModule.mIsOnIOSDevice) {
      this.statusBar.backgroundColorByHexString(this.mBackground.getColor());
    }
  }
  //chọn ngày bất kỳ
  pickSolarDate() {
    let modal = this.modalCtrl.create("PickdatePage");
    modal.onDidDismiss((data: DepartureObject) => {
      if (data && data.date) {
        this.solarDate = data.date.getDate();
        this.solarMonth = data.date.getMonth() + 1;
        this.solarYear = data.date.getFullYear();
        this.loadDanhNgon();
        this.getDayOfWeek();
        this.getLunarDateTime();
        this.getQuoteAndDayName();
        this.changeBackgroundImage();
        this.getSexagesimalCycle();
      }
    })
    modal.present({
      animate: false
    })
  }

  precacheBackgrounds() {
    if (!this.mPlatform.is("ios")) return;
    let fakeImages = document.getElementById("fakeimages");
    if (fakeImages) {
      let backgrounds = this.mAppModule.getAppConfig().get("backgrounds");
      for (let background of backgrounds) {
        let img: HTMLImageElement = <HTMLImageElement>document.createElement("img");
        img.src = background.image;
        fakeImages.appendChild(img);
      }
    }
  }
}
