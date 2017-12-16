import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { ZodiacDetailPage } from '../zodiac-detail/zodiac-detail';
import { Tuvi_12congiapDetailPage } from '../tuvi-12congiap-detail/tuvi-12congiap-detail';
import { DepartureModule } from '../../providers/departure/departure';

/**
 * Generated class for the SupertabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface Tabs {
  title: string;
  page: Page;
}

// @IonicPage()
@Component({
  selector: 'page-supertab',
  templateUrl: 'supertab.html',
})
export class SupertabPage {

  list: Array<Tabs> = [];
  selectedIndex: number = 0;
  type: number = 0;

  constructor(
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.loadParams();
  }
  data: any;
  isLoading: boolean = true;
  loadParams() {
    if (this.navParams.get("data")) this.data = this.navParams.get("data");
    if (this.navParams.get("type")) this.type = this.navParams.get("type");
    if (this.navParams.get("id"))this.selectedIndex = this.navParams.get("id");
    if (this.type == 0) {
      this.list = [
        {
          title: "Nội dung",
          page: ZodiacDetailPage
        },
        {
          title: "Lý Lịch",
          page: ZodiacDetailPage

        },
        {
          title: "Truyền thuyết",
          page: ZodiacDetailPage

        },
        {
          title: "Biểu tượng",
          page: ZodiacDetailPage
        },
        {
          title: "Mô tả",
          page: ZodiacDetailPage,

        },
        {
          title: "Tổng quát",
          page: ZodiacDetailPage
        },
      ]
    } else {
      this.list = [
        { title: "Tý", page: Tuvi_12congiapDetailPage},
        { title: "Sửu", page: Tuvi_12congiapDetailPage },
        { title: "Dần", page: Tuvi_12congiapDetailPage },
        { title: "Mão", page: Tuvi_12congiapDetailPage },
        { title: "Thìn", page: Tuvi_12congiapDetailPage},
        { title: "Tỵ", page: Tuvi_12congiapDetailPage},
        { title: "Ngọ", page: Tuvi_12congiapDetailPage },
        { title: "Mùi", page: Tuvi_12congiapDetailPage },
        { title: "Thân", page: Tuvi_12congiapDetailPage},
        { title: "Dậu", page: Tuvi_12congiapDetailPage },
        { title: "Tuất", page: Tuvi_12congiapDetailPage},
        { title: "Hợi", page: Tuvi_12congiapDetailPage },
      ];
    }
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupertabPage');
  }

  onTabSelect(ev: any) {
    this.selectedIndex = ev.index;
    // console.log('Tab selected', 'Index: ' + ev.index, 'Unique ID: ' + ev.id);
  }


}
