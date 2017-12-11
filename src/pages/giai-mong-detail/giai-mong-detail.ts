import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GiaiMongDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-giai-mong-detail',
  templateUrl: 'giai-mong-detail.html',
})
export class GiaiMongDetailPage {
  data = {
    mong_name: "",
    mong_content: ""
  };
  isLoading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
    if(this.navParams.get("data")){
      let params  = this.navParams.get("data");
      this.data.mong_name = params.mong_name;
      this.data.mong_content = params.mong_content;
    }
  }

  ionViewDidEnter() {


  }
  closeView() {
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot("GiaiMongPage");
    }
  }

}
