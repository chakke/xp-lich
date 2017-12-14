import { Component, ViewChild } from '@angular/core';
import { IonicPage, Content, NavController, NavParams, PopoverController } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { StatusBar } from '@ionic-native/status-bar';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';


@IonicPage()
@Component({
  selector: 'page-special-date',
  templateUrl: 'special-date.html',
})
export class SpecialDatePage {
  @ViewChild(Content) content: Content;
  cavalDL_data: any;
  cavalAL_data: any;
  isLoading: boolean = true;
  calendar: string = "solar";
  item_height = 30 + "px";
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams,
    private mAppModule: DepartureModule,
    public popover: PopoverController,
    private statusBar: StatusBar
  ) {
    this.item_height = (screen.height / 10) + "px";
    this.loadData();
  }
  loadData(){
    if (!this.cavalAL_data) {
      this.mAppModule.getCavalVNALDataJSON().then(
        data => {
          this.cavalAL_data = data;
        }
      )
    }
    if (!this.cavalDL_data) {
      this.mAppModule.getCavalVNDLDataJSON().then(
        data => {
          this.cavalDL_data = data;
        }
      )
    }
    this.isLoading = false;
  }
  ionViewDidEnter() {
    this.mAppModule.showAdvertisement();
    if (!this.mAppModule.mIsOnIOSDevice) this.statusBar.backgroundColorByHexString("#274c7c");
    setTimeout(() => {
    this.getElement();
    }, 400);
  }
  goToDetail(day) {
    if (this.calendar == "solar") {
      let solarDate = parseInt(day.date.split("-")[0]);
      let solarMonth = parseInt(day.date.split("-")[1]);
      let solarYear = new Date().getFullYear();
      if (day.description) {
        this.navCtrl.push("DayDetailPage", {
          dd: solarDate,
          mm: solarMonth,
          yy: solarYear,
          special_info: day.description
        })
      }
    } else {
      let lunarDate = parseInt(day.date.split("-")[0]);
      let lunarMonth = parseInt(day.date.split("-")[1]);
      let lunarYear = new Date().getFullYear();
      let solarDay = this.mAppModule.convertLunarToSolar(lunarDate, lunarMonth, lunarYear);
      if (day.description) {
        this.navCtrl.push("DayDetailPage", {
          dd: solarDay[0],
          mm: solarDay[1],
          yy: solarDay[2],
          special_info: day.description
        })
      }
    }
  }
  getLunarDate(solardate) {
    let solarDate = parseInt(solardate.split("-")[0]);

    let solarMonth = parseInt(solardate.split("-")[1]);

    let solarYear = new Date().getFullYear();

    let lunarDay = this.mAppModule.convertSolarToLunar(solarDate, solarMonth, solarYear);

    return lunarDay[0] + "/" + lunarDay[1];
  }
  getSolarDate(lunardate) {

    let lunarDate = parseInt(lunardate.split("-")[0]);

    let lunarMonth = parseInt(lunardate.split("-")[1]);

    let lunarYear = new Date().getFullYear();

    let solarDay = this.mAppModule.convertLunarToSolar(lunarDate, lunarMonth, lunarYear);

    return solarDay[0] + "/" + solarDay[1];
  }
 
  closeView() {
    this.navCtrl.pop();
  }
  changeSegment(name: string) {
    if (name != this.calendar) {
      this.content.scrollToTop(400);
      let element = document.getElementById("animateBar");
      if (element) {
        if (name == "solar") {
          element.style.transform = "translate(0,0)";
        }
        if (name == "lunar") {
          element.style.transform = "translate(" + (element.clientWidth) + "px" + ",0)";
        }
      }
    }
  }
  swipe($event) {
    let direction = $event.direction;
    let element = document.getElementById("animateBar");
    if (element) {
      if (this.calendar == "solar" && direction == 2) {
        this.content.scrollToTop(400);
        this.calendar = "lunar";
        element.style.transform = "translate(" + (element.clientWidth) + "px" + ",0)";
      }
      if (this.calendar == "lunar" && direction == 4) {
        this.content.scrollToTop(400);
        this.calendar = "solar";
        element.style.transform = "translate(0,0)";
      }
    }
  }
  isShowBox: boolean = false;
  showBox(i){
    this.solarElement[i] = !this.solarElement[i];
    if(this.solarElement[i]){
      let arrowUp = document.getElementById("up"+i);
      let arrowDown = document.getElementById("down"+i);
      let content = document.getElementById("solar-content"+i);
      if(arrowUp && arrowDown && content){
        arrowDown.style.display = "none";
        arrowUp.style.display = "block";
        content.style.display = "block";
      }
    }else{
      let arrowUp = document.getElementById("up"+i);
      let arrowDown = document.getElementById("down"+i);
      let content = document.getElementById("solar-content"+i);
      if(arrowUp && arrowDown && content){
        arrowUp.style.display = "none";
        content.style.display = "none";
        arrowDown.style.display = "block";
      }
    }
  }
  showBoxAL(i){
    this.solarElement[i] = !this.solarElement[i];
    if(this.solarElement[i]){
      let arrowUp = document.getElementById("lunar-up"+i);
      let arrowDown = document.getElementById("lunar-down"+i);
      let content = document.getElementById("lunar-content"+i);
      if(arrowUp && arrowDown && content){
        arrowDown.style.display = "none";
        arrowUp.style.display = "block";
        content.style.display = "block";
      }
    }else{
      let arrowUp = document.getElementById("lunar-up"+i);
      let arrowDown = document.getElementById("lunar-down"+i);
      let content = document.getElementById("lunar-content"+i);
      if(arrowUp && arrowDown && content){
        arrowUp.style.display = "none";
        content.style.display = "none";
        arrowDown.style.display = "block";
      }
    }
  }
  solarElement: boolean[] = [];
  lunarElement: boolean[] = [];
  getElement(){
    if(this.cavalDL_data.length>0){
      this.cavalDL_data.forEach(element => {
        this.solarElement.push(false);
      });
    }
    if(this.cavalAL_data.length>0){
      this.cavalAL_data.forEach(element => {
        this.lunarElement.push(false);
      });
    }
  } 
}
