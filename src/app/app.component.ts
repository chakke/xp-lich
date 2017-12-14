import { Component, ViewChild } from '@angular/core';
import { Platform, Tabs, App, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { DepartureTabsPage } from "../pages/tabs/departure-tabs";
import { DepartureModule } from '../providers/departure/departure';
import { NavController } from 'ionic-angular/navigation/nav-controller';


export interface MenuItems {
  id: number;
  name: string;
  component: string;
  icon: string;
  color: string;
  idOverlay: string;
  active: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild("myTabs") mTabs: Tabs;

  rootPage: any = "DepartureLoadingPage";

  constructor(
    private appCtrl: App,
    private mAppModule: DepartureModule,
    platform: Platform, statusBar: StatusBar) {
    platform.ready().then(() => {
      statusBar.styleLightContent();
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
      active: true

    },
    {
      id: 1,
      name: "Xem theo tháng",
      component: "DepartureCalendarPage",
      icon: "departure-calendar-month",
      color: "#fbd025",
      idOverlay: "overlay-calendar",
      active: false

    },
    {
      id: 2,
      name: "Đổi ngày",
      component: "DepartureChangeDatePage",
      icon: "departure-calendar-switch",
      color: "#ef679c",
      idOverlay: "overlay-change",
      active: false
    },
    {
      id: 3,
      name: "Mở rộng",
      component: "DepartureMorePage",
      icon: "departure-more",
      color: "#fc882a",
      idOverlay: "overlay-more",
      active: false
    }
  ];
  openPage(page: MenuItems) {
    if (this.setActivePage(page)) {
      this.appCtrl.getActiveNav().setRoot(page.component);
    }
  }

  closeMenu() {
    for (let i = 0; i < this.menuList.length; i++) {
      let ele = document.getElementById(this.menuList[i].idOverlay);
      if (ele) ele.style.display = "none";
    }
  }

  setActivePage(page: MenuItems): boolean {
    //Tim menu dang active hien tai
    let activeIndex = this.menuList.findIndex(ele => {
      return ele.active;
    })
    console.log(activeIndex);

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
