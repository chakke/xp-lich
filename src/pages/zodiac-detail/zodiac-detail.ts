import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { StatusBar } from '@ionic-native/status-bar';
import { AppModule } from '../../providers/app-module';
import { ScrollItems } from '../../providers/common/scroll-controller';

/**
 * Generated class for the ZodiacDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-zodiac-detail',
  templateUrl: 'zodiac-detail.html',
})
export class ZodiacDetailPage {
  data: any;
  isLoading: boolean = true;
  selectedIndex = 0;
  timeOut: number = -1;
  isScroll: boolean = false;
  isSelected : boolean = false;
  mScrollElement : HTMLElement;
  animateBarElement: HTMLElement;
  mItemWidth: number = 0;
  menu = ["Nội dung", "Lý lịch", "Truyền thuyết", "Biểu tượng", "Mô tả", "Tổng quát"];
  constructor(
    private mAppModule: DepartureModule,
    private statusBar: StatusBar,
    public navCtrl: NavController, public navParams: NavParams) {
    this.loadParams();
    this.isLoading = false;
  }
  isCreatedEvent: boolean = false;

  ionViewDidEnter() {
    if (!this.mAppModule.mIsOnIOSDevice) this.statusBar.backgroundColorByHexString("#274c7c");
    let ele = document.getElementById("animateBar");
    if(ele){
      this.animateBarElement = ele;
    }

    this.createEvent();
   
  }
  createEvent(){
    if(this.isCreatedEvent)return;
    this.isCreatedEvent = true;
    
    let element = document.getElementById("menu-zodiac");
    if (element) {
    this.mScrollElement = element;
      if(element.childElementCount > 0){
        this.mItemWidth = element.children.item(0).clientWidth;
      }
    }
    element.addEventListener("scroll", () => {
      if (!this.isScroll && !this.isSelected) {
        this.scrollEnd();
      }
    })
    element.addEventListener("touchstart", ()=>{
      this.isSelected = false;
    })

  }

  scrollEnd(){
    if(this.timeOut)clearTimeout(this.timeOut);
    this.timeOut = setTimeout(() => {
      let scrollLeft = this.mScrollElement.scrollLeft;
      let newIndex = Math.round(scrollLeft/this.mItemWidth);
      this.mScrollElement.scrollLeft = newIndex * this.mItemWidth;
      this.selectedMenu(newIndex,false);
      this.isScroll = false;
    }, 100);
  }


  loadParams() {
    this.data = this.navParams.get("data");
  }
  closeView() {
    this.navCtrl.pop();
  }
  getContent(): string {
    if (this.selectedIndex == 0) {
      return this.data.content;
    }
    if (this.selectedIndex == 1) {
      return this.data.profile;
    }
    if (this.selectedIndex == 2) {
      return this.data.story;
    }
    if (this.selectedIndex == 3) {
      return this.data.symbol;
    }
    if (this.selectedIndex == 4) {
      return this.data.description;
    }
    if (this.selectedIndex == 5) {
      return this.data.commom;
    }
  }
  tranformAnimateBar(distanceTranform: number){
    this.animateBarElement.style.transform = "translate(" + distanceTranform + "px" + ",0)";
  }
  selectedMenu(index: number, isSelected: boolean) {
    this.selectedIndex = index;
    this.isSelected = isSelected;
    AppModule.getInstance().getScrollController().doScrollTop("contentZodiac");
    let distanceTranform = index * this.mItemWidth;
    this.tranformAnimateBar(distanceTranform);
    
    if (index > 0 && index < 5 && isSelected) {
      let distanceScroll: number = 0;
      distanceScroll = (index - 1) * this.mItemWidth;
      if (this.mScrollElement) {
        this.mScrollElement.scrollLeft = distanceScroll;
        this.isScroll = false;
       
      }
    };
    // this.isSelected = false;
  }
  swipe($event) {
    let direction = $event.direction;
    if (direction == 2 && this.selectedIndex < 5) {
      this.selectedMenu(this.selectedIndex + 1, true);
    }
    if (direction == 4 && this.selectedIndex > 0) {
      this.selectedMenu(this.selectedIndex - 1, true);
    }

  }
}
