import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TuviTrondoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tuvi-trondoi',
  templateUrl: 'tuvi-trondoi.html',
})
export class TuviTrondoiPage {
  page_title: string=  "Tử Vi Trọn Đời";
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TuviTrondoiPage');
  }

}
