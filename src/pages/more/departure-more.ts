import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { StatusBar } from '@ionic-native/status-bar';


@IonicPage()
@Component({
  selector: 'page-departure-more',
  templateUrl: 'departure-more.html',
})
export class DepartureMorePage {
  more_options = [];
  cavalVNAL: any;
  cavalVNDL: any;
  vankhan_data: any;
  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private mAppModule: DepartureModule,
    private mToastController: ToastController,
    private statusBar: StatusBar
  ) {

    this.mAppModule.loadConfig().then(() => {
      this.more_options = this.mAppModule.getAppConfig().get("DepartureMorePage")['subviews'];
    });
  }

  openMenu() {
    let overlay = document.getElementById("overlay-more");
    let bg = document.getElementById("bg-more");

    if (overlay && bg && bg.childElementCount> 0) {
      overlay.style.display = "block";
      bg.style.color = "#66cccc";
      bg.children[0].setAttribute("style", "opacity: 1");
    }
  }
 
  ionViewDidEnter() {
    if (!this.mAppModule.mIsOnIOSDevice) { this.statusBar.backgroundColorByHexString("#20c0e1") };
    if (!this.cavalVNAL) {
      this.mAppModule.getCavalVNALDataJSON().then(
        data => {
          this.cavalVNAL = data;
        }, error => { }
      )
    }
    if (!this.vankhan_data) {
      this.mAppModule.getVanKhanDataJSON().then(
        data => {
          this.vankhan_data = data;
        }, error => { }
      )
    }
    if (!this.cavalVNDL) {
      this.mAppModule.getCavalVNDLDataJSON().then(
        data => {
          this.cavalVNDL = data;
        }, error => { }
      )
    }
  }
  viewPage(component: string) {
    if (component && component.length > 0) {
      this.navCtrl.push(component);
    }
  }
}
