import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { TuVi12ConGiap } from '../../providers/departure/interface/tuvi';
import { DepartureModule } from '../../providers/departure/departure';

/**
 * Generated class for the Tuvi_12congiapDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage(
//   {
//     segment: 'Tuvi12ConGiap/:id'
//   }
// )
@Component({
  selector: 'page-tuvi-12congiap-detail',
  templateUrl: 'tuvi-12congiap-detail.html',
})
export class Tuvi_12congiapDetailPage {
  @ViewChild(Content) content: Content;
  mDatas: TuVi12ConGiap;
  isLoading: boolean = true;
  
  constructor(
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.mDatas = {
      name: "",
      ngheNghiep: "",
      tinhCach: "",
      tinhCam: ""
    }
    this.loadParam();
    this.mNames = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tuvi_12congiapDetailPage');
  }
  mColors: Array<String> = [];
  mIcons: Array<String> = [];
  mNames: Array<String> = [];
  isLoadIcon: boolean = true;
  ionViewDidEnter() {
    this.mAppModule.loadConfig().then(
      () => {
        let tuviData = this.mAppModule.getAppConfig().get("TuVi12ConGiapPage");
        if (tuviData) {
          this.mIcons = tuviData.icons;
          this.mColors = tuviData.colors;
          this.isLoadIcon = false;
        }
      }
    );
  }
  currendId: number = 0;
  loadParam() {
    if (this.navParams.data["id"]) this.currendId = this.navParams.data["id"];
    
    if (this.navParams.get("data")) {
      var data = this.navParams.get("data");
      this.mDatas = {
        name: data[this.currendId].nameTC12CG,
        ngheNghiep: data[this.currendId].ngheNghiep,
        tinhCach: data[this.currendId].tinhCach,
        tinhCam: data[this.currendId].tinhCam
      }
      this.isLoading = false;
    } else {
      if (this.navParams.data["id"]) {
        this.currendId = parseInt(this.navParams.data["id"]);
        this.loadData();
      }
    }
  }

  loadData() {
    this.mAppModule.getTuViByID(this.currendId).then(
      (data: any) => {
        this.mDatas = {
          name: data.nameTC12CG,
          ngheNghiep: data.ngheNghiep,
          tinhCach: data.tinhCach,
          tinhCam: data.tinhCam
        }
        this.isLoading = false;

      }
    ).catch((error) => { })
  }
  closeView() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot("DepartureMorePage");
    }
  }

  changeItem(i) {
    this.currendId = i;
    this.loadData();
    setTimeout(() => {
      this.content.scrollToTop(300);
    }, 200);
  }
}
