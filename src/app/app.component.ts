import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs, App, Nav, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DepartureModule } from '../providers/departure/departure';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { Element } from '@angular/compiler';


export interface MenuItems {
  id: number;
  name: string;
  component: string;
  icon: string;
  color: string;
  idOverlay: string;
  idBg: string;
  active: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild("myTabs") mTabs: Tabs;
  @ViewChild(Menu) menu: Menu;

  rootPage: any = "DepartureLoadingPage";

  constructor(
    private appCtrl: App,
    private mAppModule: DepartureModule,
    private menuCtrl: MenuController,
    keyboad: Keyboard,
    platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
      keyboad.disableScroll(true);
    });

  }

  menuList: MenuItems[] = [
    {
      id: 0,
      name: "Xem theo ngày",
      component: "DepartureHomePage",
      icon: "departure-calendar-day",
      color: "#33cc99",
      idOverlay: "overlay-home",
      idBg: "bg-home",
      active: true

    },
    {
      id: 1,
      name: "Xem theo tháng",
      component: "DepartureCalendarPage",
      icon: "departure-calendar-month",
      color: "#fbd025",
      idOverlay: "overlay-calendar",
      idBg: "bg-calendar",
      active: false

    },
    {
      id: 2,
      name: "Đổi ngày",
      component: "DepartureChangeDatePage",
      icon: "departure-calendar-switch",
      color: "#ef679c",
      idOverlay: "overlay-change",
      idBg: "bg-change",
      active: false
    },
    {
      id: 3,
      name: "Mở rộng",
      component: "DepartureMorePage",
      icon: "departure-more",
      color: "#fc882a",
      idOverlay: "overlay-more",
      idBg: "bg-more",
      active: false
    }
  ];
  openPage(page: MenuItems) {
    if (this.setActivePage(page)) {
      this.appCtrl.getActiveNav().setRoot(page.component);
    }
  }

  openMenu(){
    let activeIndex = this.menuList.findIndex(ele => {
      return ele.active;
    });

    let overlay = document.getElementById(this.menuList[activeIndex].idOverlay);
    let bg = document.getElementById(this.menuList[activeIndex].idBg);

    if (overlay && bg && bg.childElementCount> 0) {
      overlay.style.display = "block";
      bg.style.color = "#66cccc";
      bg.children[0].setAttribute("style", "opacity: 1");
    }

  }
 

  closeMenu() {
    for (let i = 0; i < this.menuList.length; i++) {
      let ele = document.getElementById(this.menuList[i].idOverlay);
      let bg = document.getElementById(this.menuList[i].idBg);

      if (ele) ele.style.display = "none";
      if(bg && bg.childElementCount> 0){
        bg.style.color = "#fff";
        bg.children[0].setAttribute("style", "opacity: 0");
      }
      // if (ele1) ele1.style.opacity= "0";

    }
  }
  apha: number = 0.05;
  changeMenu(event) {
    let activeIndex = this.menuList.findIndex(ele => {
      return ele.active;
    });
    var opacityNumber = event + 0.1;
    if(opacityNumber > 1)opacityNumber = 1;
    let bg = document.getElementById(this.menuList[activeIndex].idBg);
     bg.children[0].setAttribute("style", "opacity: " + opacityNumber);
    if (event > this.apha) {
      // show overlay

      let overlay = document.getElementById(this.menuList[activeIndex].idOverlay);
      let bg = document.getElementById(this.menuList[activeIndex].idBg);

      if (overlay && bg && bg.childElementCount> 0) {
        overlay.style.display = "block";
        bg.style.color = "#66cccc";
        // bg.children[0].setAttribute("style", "opacity: " + opacityNumber);
      }

    } else {
      let activeIndex = this.menuList.findIndex(ele => {
        return ele.active;
      });

      let overlay = document.getElementById(this.menuList[activeIndex].idOverlay);
      let bg = document.getElementById(this.menuList[activeIndex].idBg);

      if (overlay && bg) {
        overlay.style.display = "none";
        bg.style.color = "#fff";
        bg.children[0].setAttribute("style", "opacity: 0");
      }
    }
  }
  setActivePage(page: MenuItems): boolean {
    //Tim menu dang active hien tai
    let activeIndex = this.menuList.findIndex(ele => {
      return ele.active;
    })

    if (activeIndex > -1) {
      // Neu trung roi thi thoi
      if (this.menuList[activeIndex].id == page.id) {
        console.log("trung");

        return false;
      } else {
        this.menuList[activeIndex].active = false;
      }
    }
    for (let item of this.menuList) {
      if (item.component == page.component) {
        item.active = true;
      }
    }
    return true;
  }
}
