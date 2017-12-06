import { TNBINFO } from "../../providers/departure/interface/tnb_Info";
import { DepartureModule } from "../../providers/departure/departure";
import { Utils } from "../../providers/app-utils";
import { DepartureUtils } from "../../providers/departure/departure-utils";
import { HUONGXUATHANH } from "../../providers/departure/interface/huong_xuat_hanh";

export class DayDetail {
    dd: number;
    mm: number;
    yy: number;
    day_of_week: string;
    lunarDate: number;
    lunarMonth: number;
    lunarYear: number;
    special_info?: string;
    special_name?: any;
    sexagesimalCycleTime: string;
    sexagesimalCycleDate: string;
    sexagesimalCycleMonth: string;
    sexagesimalCycleYear: string;
    TNBINFO: TNBINFO;
    trucDay: string;
    tietDay: string;
    hour_better: any;
    hour_bad: any;
    huong_xuat_hanh = new Array<HUONGXUATHANH>();
    tuoi_xung_khac: string;
    sao_tot: any;
    sao_xau: any;

    constructor(dd?: number, mm?: number, yy?: number) {
        if (dd) this.dd = dd;
        if (mm) this.mm = mm;
        if (yy) this.yy = yy;

    }
    setData(dd: number, mm: number, yy: number) {
        this.dd = dd;
        this.mm = mm;
        this.yy = yy;
        this.special_info = "";
        this.getDayOfWeek();
        this.getSexagesimal();
        this.loadLunarDate();
    }
    getDayOfWeek() {
        this.day_of_week = Utils.getDayOfWeek(this.dd, this.mm, this.yy);
    }
    getSexagesimal() {
        let date = new Date();
        this.sexagesimalCycleTime = DepartureUtils.getSexagesimalCycleByTime(this.dd, this.mm, this.yy, date.getHours());
        this.sexagesimalCycleDate = DepartureUtils.getSexagesimalCycleByDay(this.dd, this.mm, this.yy);
        this.sexagesimalCycleMonth = DepartureUtils.getSexagesimalCycleByMonth(this.dd, this.mm, this.yy);
        this.sexagesimalCycleYear = DepartureUtils.getSexagesimalCycleByYear(this.dd, this.mm, this.yy);
    }
    loadLunarDate() {
        let lunarday = DepartureUtils.convertSolarToLunar(this.dd, this.mm, this.yy);
        this.lunarDate = lunarday[0];
        this.lunarMonth = lunarday[1];
        this.lunarYear = lunarday[2];
    }
}