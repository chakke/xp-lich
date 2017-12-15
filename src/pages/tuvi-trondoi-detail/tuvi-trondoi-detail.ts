import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { TuViTronDoi } from '../../providers/departure/interface/tuvi';
import { DepartureTabsPage } from '../tabs/departure-tabs';

/**
 * Generated class for the TuviTrondoiDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tuvi-trondoi-detail',
  templateUrl: 'tuvi-trondoi-detail.html',
})
export class TuviTrondoiDetailPage {
  data: TuViTronDoi;
  page_title : string = "Tử Vi Trọn Đời";
  
  constructor(
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.createDataDefault();
    this.loadParam();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TuviTrondoiDetailPage');
  }

  loadParam(){
    if(this.navParams.get("data")){
      this.data = this.navParams.get("data");
    }
  }
  createDataDefault() {
    this.data = {
      CuocSong: "",
      GiaDaoCongDanh: "",
      GioXuatHanh: "",
      NamKhoKhan: "",
      NamSinh: "",
      TinhDuyen: "",
      TongQuan: "",
      TucNgu: "",
      TungNam: "",
      TuoiHop: "",
      TuoiKy: "",
      VoChong: ""
    }
  }
  closeView(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot("DepartureMorePage");
    }
  }
  

}
