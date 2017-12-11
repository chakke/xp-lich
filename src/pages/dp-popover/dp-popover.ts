import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the DpPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dp-popover',
  templateUrl: 'dp-popover.html',
})
export class DpPopoverPage {
  data: string= "";
  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController, public navParams: NavParams) {
    if(navParams.get("data")){
      this.data = navParams.get("data");
    }
  }

  ionViewDidLoad() {
    
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
