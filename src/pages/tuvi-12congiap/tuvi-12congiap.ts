import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DepartureModule } from '../../providers/departure/departure';
import { DepartureTabsPage } from '../tabs/departure-tabs';

/**
 * Generated class for the Tuvi_12congiapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tuvi-12congiap',
  templateUrl: 'tuvi-12congiap.html',
})
export class Tuvi_12congiapPage {

  constructor(
    private mAppModule: DepartureModule,
    public navCtrl: NavController, public navParams: NavParams) {
    this.onLoadData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tuvi_12congiapPage');
  }
  page_title: string = "Tử Vi";
  mIcons: any;
  data: any;
  isLoading: boolean = true;
  mColors: Array<String> = [];
  onLoadData() {
    if (this.data) return;
    this.mAppModule.loadConfig().then(
      () => {
        let tuviData = this.mAppModule.getAppConfig().get("TuVi12ConGiapPage");
        if (tuviData) {
          this.page_title = tuviData.page_title;
          this.mIcons = tuviData.icons;
          this.mColors = tuviData.colors;
        }
      }
    );
    this.mAppModule.loadTuVi12ConGiapDataJSON().then(
      data => {
        this.data = data;
        this.isLoading = false;
      }, error => { }
    )
  }

  closeView(){
    if(this.navCtrl.canGoBack()){
      this.navCtrl.pop();
    }else{
      this.navCtrl.setRoot("DepartureMorePage");
    }
  }

  viewDetail(index){
    this.navCtrl.push("Tuvi_12congiapDetailPage",{ id: index, data: this.data[index]});
    
  }

}
