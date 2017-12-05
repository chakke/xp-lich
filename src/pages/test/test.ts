import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppModule } from "../../providers/app-module";
import { DepartureModule } from '../../providers/departure/departure';
import { AppLoop } from "../../providers/app-loop";


class ScrollContainer {

  mElement: HTMLElement = null;
  mEventListenerCreated: boolean = false;
  mScrolling: boolean = false;
  mTouchStart: boolean = false;
  mTouchEnd: boolean = false;

  mScrollEndListener: any;
  mIdleTime: number = 0;
  mItemHeight: number = 40;

  constructor(id: string) {
    this.mElement = document.getElementById(id);
    if (this.mElement && this.mElement.childElementCount > 0) {
      let node = this.mElement.children.item(0);
      if (node) {
        this.mItemHeight = node.clientHeight;
      }
    }
  }
  setScrollEndListener(listener) {
    this.mScrollEndListener = listener;
  }
  createListener() {
    AppLoop.getInstance().scheduleUpdate(this);

    if (!this.mElement) return;
    if (this.mEventListenerCreated) return;
    this.mEventListenerCreated = true;
    this.mElement.onscroll = () => {
      this.mScrolling = true;
      this.mIdleTime = 0;
    };
    this.mElement.addEventListener("touchstart", (event) => {
      this.mTouchStart = true;
      this.mTouchEnd = false;
      console.log("touch start");
      
    });
    this.mElement.addEventListener("touchend", (event) => {
      this.mTouchEnd = true;
      console.log("touch end");
      
    });
    // this.mElement.addEventListener("mousedown", (event) => {
    
    //   console.log("mouse down");
      
    // });
    this.mElement.addEventListener("mouseup", (event) => {
      this.mTouchEnd = true;
     
      console.log("mouse up");
      
    });
    // this.mElement.addEventListener("mouseover", (event) => {
     
    //   console.log("mouse over");
      
    // });
  }

  onUpdate() {
    if (!this.mScrolling && this.mTouchEnd) return;
    if (this.mIdleTime < 5) {
      this.mIdleTime++;
    } else {
      if (this.mTouchEnd) {
        if (this.mScrollEndListener) this.mScrollEndListener(this.mElement.scrollTop);
        this.mTouchEnd = false;
        this.mTouchStart = false;
        this.mScrolling = false;
      }
    }
  }

  scrollToIndex(itemIndex: number, options?) {
    let scrollTop = itemIndex * this.mItemHeight;
    AppModule.getInstance().getScrollController().doScroll("container", scrollTop, options);
  }

  getElementInFocus(top: number) {
    return Math.floor((top + this.mItemHeight / 2) / this.mItemHeight);
  }

}



@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

  items: Array<number> = [];
  mDateScroll: ScrollContainer;
  constructor(public mAppModule: DepartureModule, public navCtrl: NavController, public navParams: NavParams) {
    while (this.items.length < 100) {
      this.items.push(this.items.length);
    }
  }

  ionViewDidEnter() {
    this.mDateScroll = new ScrollContainer("container");
    this.mDateScroll.createListener();
    this.mDateScroll.setScrollEndListener((scrollTop) => {
      this.mDateScroll.scrollToIndex(this.mDateScroll.getElementInFocus(scrollTop));
    });
  }


}
