import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
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

// @IonicPage()
@Component({
  selector: 'page-zodiac-detail',
  templateUrl: 'zodiac-detail.html',
})
export class ZodiacDetailPage  {
  @ViewChild(Content) content : Content;
  data: any;
  isLoading: boolean = true;
  selectedIndex = 0;
 
  menu = ["Nội dung", "Lý lịch", "Truyền thuyết", "Biểu tượng", "Mô tả", "Tổng quát"];
  constructor(
    private mAppModule: DepartureModule,
    private statusBar: StatusBar,
    public navCtrl: NavController, public navParams: NavParams) {
    this.loadParams();
    this.isLoading = false;
  }

  ionViewDidEnter() {
    if (!this.mAppModule.mIsOnIOSDevice) this.statusBar.backgroundColorByHexString("#274c7c");
    this.content.scrollTop = 0;
  }
  loadParams() {
    this.data = this.navParams.get("data");
    if(this.navParams.get("id")){
      this.selectedIndex = this.navParams.get("id");
    }
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
}
