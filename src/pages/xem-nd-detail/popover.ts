import {Component} from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

@Component({
    template:`
        <div text-left *ngIf= "!isLoading" padding style="position:relative">
            <p style="line-height: 1.5em; font-size:4.2vw">{{description}}</p>
            <div style="width:100%; position: absolute;bottom: 0;left:0" text-right><span style="color:#488aff;font-size:4.2vw" (click)="closeView()">OK</span></div>
        </div>
    `
})

export class XEMNDPopover{
    isLoading : boolean = true;
    description: any = "";
    constructor(
        private navParams: NavParams,
        public viewCtrl: ViewController
    ){

    }
    ionViewDidLoad(){
        this.description = this.navParams.get('description');
        this.isLoading = false;
    }
    closeView(){
        this.viewCtrl.dismiss();
    }
}