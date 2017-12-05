import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DepartureModule } from '../../providers/departure/departure';

/**
 * Generated class for the VanKhanCtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-van-khan-ct',
  templateUrl: 'van-khan-ct.html',
})
export class VanKhanCtPage {
  data: any;
  van_khan_td: string;
  van_khan: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private statusBar : StatusBar,
    private mAppModule : DepartureModule,
  ) {
   
  }
  ngOnInit(){
    this.data = this.navParams.get("data");
    this.van_khan_td = this.data.TenLoai;
    this.van_khan = this.data.VanKhan;
   
  }

  ionViewDidEnter() {
    if(!this.mAppModule.mIsOnIOSDevice)this.statusBar.backgroundColorByHexString("#274c7c");
    this.mAppModule.showAdvertisement();
  }
  closeView(){
    this.navCtrl.pop();
  }
  changeTextSmaller(){
    let p = document.getElementById("text-vk");
    let t = document.getElementById("title-vk");
    t.style.fontSize = "4.5vw";
    p.style.fontSize = "4vw";
  }
  changeTextLarger(){
    let p = document.getElementById("text-vk");
    let t = document.getElementById("title-vk");
    t.style.fontSize = "5vw";
    p.style.fontSize = "4.5vw";
  }

}
