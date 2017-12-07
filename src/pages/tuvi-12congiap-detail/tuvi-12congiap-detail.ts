import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TuVi12ConGiap } from '../../providers/departure/interface/tuvi';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureTabsPage } from '../tabs/departure-tabs';

/**
 * Generated class for the Tuvi_12congiapDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage(
  {
    segment: 'Tuvi12ConGiap/:id'
  }
)
@Component({
  selector: 'page-tuvi-12congiap-detail',
  templateUrl: 'tuvi-12congiap-detail.html',
})
export class Tuvi_12congiapDetailPage {

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tuvi_12congiapDetailPage');
  }

  loadParam() {
    if (this.navParams.get("data")) {
      var data = this.navParams.get("data");
      this.mDatas = {
        name: data.nameTC12CG,
        ngheNghiep: data.ngheNghiep,
        tinhCach: data.tinhCach,
        tinhCam: data.tinhCam
      }
      console.log(this.mDatas);
      
      this.isLoading = false;
    } else {
      if (this.navParams.data["id"]) {
        this.mAppModule.getTuViByID(parseInt(this.navParams.data["id"])).then(
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
    }
  }
  closeView(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot(DepartureTabsPage);
    }
  }
}
