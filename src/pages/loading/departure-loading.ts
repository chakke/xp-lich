import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from "../../providers/departure/departure";
import { AppModule } from "../../providers/app-module";
import { AppController } from "../../providers/app-controller";
import { AdMobFree } from "@ionic-native/admob-free";
import { GoogleAnalytics } from "@ionic-native/google-analytics";
// import { DepartureTabsPage } from "../tabs/departure-tabs";

import { SplashScreen } from '@ionic-native/splash-screen';
import { SupertabPage } from '../supertab/supertab';
@IonicPage()
@Component({
  selector: 'page-departure-loading',
  templateUrl: 'departure-loading.html',
})
export class DepartureLoadingPage {
  
  constructor(
    public mAdmobfree: AdMobFree,
    public mGoogleAnalytics: GoogleAnalytics,
    private mPlatform: Platform,
    private navParams: NavParams,
    private navCtrl: NavController,
    private mAppModule: DepartureModule,
    public mSplashScreen: SplashScreen
  ) {
   
  }
  ionViewDidLeave() {
    this.mSplashScreen.hide();
  }
  ionViewDidEnter() {

    AppController.getInstance().setPlatform(this.mPlatform);
    //this.mAppModule.mIsOnIOSDevice = AppController.getInstance().isIOS();
    if (this.mPlatform.is('android') || this.mPlatform.is('ios')) {
      this.mAppModule.mAdsManager.setAdmobFree(this.mAdmobfree);
      this.mAppModule.mAnalyticsManager.setGoogleAnalytics(this.mGoogleAnalytics);
    }

    this.mAppModule.loadConfig().then(
      () => {
        this.onLoadedConfig();
      }
    );

    this.mAppModule.loadDanhNgon();

  }

  

  onLoadedConfig() {
    let admobData = this.mAppModule.getAppConfig().get("admob");
    let assets = this.mAppModule.getAppConfig().get("resources");
    this.mAppModule.getAdsManager().load(this.mPlatform, admobData);
    AppModule.getInstance().getResourceLoader().load(assets).then(
      () => {
        this.onLoaded();
      }
    );


  }

  onLoaded() {
    this.navCtrl.setRoot("DepartureHomePage", {}, {
      animate: true,
      direction: "forward",
      duration: 400
    });
    // this.navCtrl.setRoot(TestPage);
  }
}
