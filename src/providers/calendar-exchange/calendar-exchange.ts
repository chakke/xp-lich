import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DDMMYYDays } from '../class/day';
import { ZODIACTIME } from './zodiactimestorage';
import { CanChi } from '../interface/canchi';

/*
  Generated class for the CalendarModuleProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalendarExchangeModule {

  GMT: number = 7;
  JANUARY: number = 1;
  FEBRUARY: number = 2;
  MARCH: number = 3;
  APRIL: number = 4;
  MAY: number = 5;
  JUNE: number = 6;
  JULY: number = 7;
  AUGUST: number = 8;
  SEPTEMBER: number = 9;
  OCTORBER: number = 10;
  NOVEMBER: number = 11;
  DECEMBER: number = 12;


  CANS: Array<string> = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  CHIS: Array<string> = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

  day_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor(public http: HttpClient) {

  }
  convertDDMMYYToJulius(solarDay: number, solarMonth: number, solarYear: number) {
    // Tính số này Julius
    var monthDistance, yearJulius, monthJulius;
    var juliusDate = 0;

    monthDistance = Math.floor((14 - solarMonth) / 12);
    yearJulius = solarYear + 4800 - monthDistance;
    monthJulius = solarMonth + 12 * monthDistance - 3;

    let dayDistance = solarDay + Math.floor((153 * monthJulius + 2) / 5) + 365 * yearJulius + Math.floor(yearJulius / 4);

    juliusDate = dayDistance - Math.floor(yearJulius / 100) + Math.floor(yearJulius / 400) - 32045;

    if (juliusDate < 2299161) {
      juliusDate = dayDistance - 32083;
    }

    return juliusDate;
  }

  convertJuliusToDDMMYY(juliusDate: number): DDMMYYDays {
    var aNumber, bNumber, cNumber, dNumber, eNumber, mNumber;
    let result = new DDMMYYDays();

    if (juliusDate > 2299161) {
      // Gregorian calendar
      aNumber = juliusDate + 32044;
      bNumber = Math.floor((4 * aNumber + 3) / 146097);
      cNumber = aNumber - Math.floor((bNumber * 146097) / 4);
    } else {
      // Julius calendar
      bNumber = 0;
      cNumber = juliusDate + 32082;
    }

    dNumber = Math.floor((4 * cNumber + 3) / 1461);
    eNumber = cNumber - Math.floor((1461 * dNumber) / 4);
    mNumber = Math.floor((5 * eNumber + 2) / 153);
    var day = eNumber - Math.floor((153 * mNumber + 2) / 5) + 1;
    var month = mNumber + 3 - 12 * Math.floor(mNumber / 10);
    var year = bNumber * 100 + dNumber - 4800 + Math.floor(mNumber / 10);
    result.setDay(day, month, year);

    return result;

  }

  getNewMoonDay(k: number, timeZone?: number): number {
    // Tính ngày đầu tháng âm lịch chứa ngày N

    let T, T2, T3, dr, Jd1, M, Mpr, F, C1, deltat, JdNew;
    var GMT: number;

    GMT = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }

    T = k / 1236.85; // Time in Julian centuries from 1900 January 0.5
    T2 = T * T;
    T3 = T2 * T;
    dr = Math.PI / 180;
    Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
    Jd1 = Jd1 + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr); // Mean new moon
    M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3; // Sun's mean anomaly
    Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3; // Moon's mean anomaly
    F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3; // Moon's argument of latitude
    C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
    C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
    C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
    C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
    C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
    C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
    C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
    if (T < -11) {
      deltat = 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3;
    } else {
      deltat = -0.000278 + 0.000265 * T + 0.000262 * T2;
    };
    JdNew = Jd1 + C1 - deltat;
    return Math.floor((JdNew + 0.5 + GMT / 24));
  }

  getSunLongitude(jdn: number, timeZone?: number): number {
    // Tính tọa độ mặt trời

    var GMT: number = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }

    let T, T2, dr, M, L0, DL, L;
    T = (jdn - 2451545.5 - GMT / 24) / 36525; // Time in Julian centuries from 2000-01-01 12:00:00 GMT
    T2 = T * T;
    dr = Math.PI / 180; // degree to radian
    M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2; // mean anomaly, degree
    L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2; // mean longitude, degree
    DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
    DL = DL + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
    L = L0 + DL; // true longitude, degree
    L = L * dr;
    L = L - Math.PI * 2 * (Math.floor((L / (Math.PI * 2)))); // Normalize to (0, 2*PI)
    return Math.floor((L / Math.PI * 6));
  }

  getLunarMonth11(yy: number, timeZone?: number): number {
    // Tính ngày bắt đầu tháng 11 âm lịch

    var GMT: number = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }

    var k, off, sunLong;
    var nm: number = 0;
    off = this.convertDDMMYYToJulius(31, 12, yy) - 2415021;
    k = Math.floor((off / 29.530588853));
    nm = this.getNewMoonDay(k, GMT);
    sunLong = this.getSunLongitude(nm, GMT); // sun longitude at local midnight
    if (sunLong >= 9) {
      nm = this.getNewMoonDay(k - 1, GMT);
    }

    return nm;
  }

  getLeapMonthOffset(a11: number, timeZone?: number): number {
    // Xác định tháng nhuận
    var GMT: number = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }

    var k, last, arc, i;
    k = Math.floor(((a11 - 2415021.076998695) / 29.530588853 + 0.5));
    last = 0;
    i = 1; // We start with the month following lunar month 11
    arc = this.getSunLongitude(this.getNewMoonDay(k + i, GMT), GMT);
    do {
      last = arc;
      i++;
      arc = this.getSunLongitude(this.getNewMoonDay(k + i, GMT), GMT);
    } while (arc != last && i < 14);

    return i - 1;
  }


  public convertSolarToLunar(dd: number, mm: number, yy: number, timeZone?: number): DDMMYYDays {
    // Chuyển ngày dương sang âm lịch

    var GMT: number = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }

    let k, dayNumber, monthStart, a11, b11, lunarDay, lunarMonth, lunarYear, lunarLeap;

    let dayResult = new DDMMYYDays();

    dayNumber = this.convertDDMMYYToJulius(dd, mm, yy);
    k = Math.floor(((dayNumber - 2415021.076998695) / 29.530588853));
    monthStart = this.getNewMoonDay(k + 1, GMT);
    if (monthStart > dayNumber) {
      monthStart = this.getNewMoonDay(k, GMT);
    }
    a11 = this.getLunarMonth11(yy, GMT);
    b11 = a11;
    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = this.getLunarMonth11(yy - 1, GMT);
    } else {
      lunarYear = yy + 1;
      b11 = this.getLunarMonth11(yy + 1, GMT);
    }
    lunarDay = dayNumber - monthStart + 1;
    let diff = Math.floor(((monthStart - a11) / 29));
    lunarLeap = 0;
    lunarMonth = diff + 11;
    if (b11 - a11 > 365) {
      let leapMonthDiff = this.getLeapMonthOffset(a11, GMT);
      if (diff >= leapMonthDiff) {
        lunarMonth = diff + 10;
        if (diff == leapMonthDiff) {
          lunarLeap = 1;
        }
      }
    }
    if (lunarMonth > 12) {
      lunarMonth = lunarMonth - 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
      lunarYear -= 1;
    }
    dayResult.setDay(lunarDay, lunarMonth, lunarYear);

    return dayResult;
  }

  convertLunar2Solar(lunarDay: number, lunarMonth: number, lunarYear: number, timeZone?: number): DDMMYYDays {
    // Chuyển ngày âm sang dương lịch
    var GMT: number = this.GMT;
    if (timeZone) {
      GMT = timeZone;
    }
    let k, a11, b11, off, leapOff, leapMonth, monthStart;
    if (lunarMonth < 11) {
      a11 = this.getLunarMonth11(lunarYear - 1, GMT);
      b11 = this.getLunarMonth11(lunarYear, GMT);
    } else {
      a11 = this.getLunarMonth11(lunarYear, GMT);
      b11 = this.getLunarMonth11(lunarYear + 1, GMT);
    }
    off = lunarMonth - 11;
    if (off < 0) {
      off += 12;
    }
    if (b11 - a11 > 365) {
      leapOff = this.getLeapMonthOffset(a11, GMT);
      leapMonth = leapOff - 2;
      if (leapMonth < 0) {
        leapMonth += 12;
      }
      if (off >= leapOff) {
        off += 1;
      }
    }
    k = Math.floor((0.5 + (a11 - 2415021.076998695) / 29.530588853));
    monthStart = this.getNewMoonDay(k + off, GMT);
    return this.convertJuliusToDDMMYY(monthStart + lunarDay - 1);
  }

  //Tính Can Chi Theo Năm (đầu vào theo dương lịch)
  getSexagesimalCycleByYear(date: number, month: number, year: number): CanChi {
    let result: CanChi;
    let x: DDMMYYDays = this.convertSolarToLunar(date, month, year);
    let canIndex: number = Math.floor(((x.year + 6) % 10));
    let chiIndex: number = Math.floor(((x.year + 8) % 12));
    result.can = this.CANS[canIndex];
    result.chi = this.CHIS[chiIndex];
    return result;
  }

  //tính can chi theo tháng (đầu vào theo dương lịch)
  getSexagesimalCycleByMonth(dd: any, mm: any, yy: any) : CanChi {
    let result: CanChi;
    let chi: string;
    let y: DDMMYYDays = this.convertSolarToLunar(dd, mm, yy);
    let month: number = y.month;
    if (month == 1) {
      chi = "Dần"
    }
    if (month == 2) {
      chi = "Mão"
    }
    if (month == 3) {
      chi = "Thìn"
    }
    if (month == 4) {
      chi = "Tỵ"
    }
    if (month == 5) {
      chi = "Ngọ"
    }
    if (month == 6) {
      chi = "Mùi"
    }
    if (month == 7) {
      chi = "Thân"
    }
    if (month == 8) {
      chi = "Dậu"
    }
    if (month == 9) {
      chi = "Tuất"
    }
    if (month == 10) {
      chi = "Hợi"
    }
    if (month == 11) {
      chi = "Tý"
    }
    if (month == 12) {
      chi = "Sửu"
    }

    let z: DDMMYYDays = this.convertSolarToLunar(dd, mm, yy);
    let x: number = (z.year * 12 + z.month + 3) % 10;
    let can: string;
    if (x == 0) {
      can = "Giáp"
    }
    if (x == 1) {
      can = "Ất"
    }
    if (x == 2) {
      can = "Bính"
    }
    if (x == 3) {
      can = "Đinh"
    }
    if (x == 4) {
      can = "Mậu"
    }
    if (x == 5) {
      can = "Kỷ"
    }
    if (x == 6) {
      can = "Canh"
    }
    if (x == 7) {
      can = "Tân"
    }
    if (x == 8) {
      can = "Nhâm"
    }
    if (x == 9) {
      can = "Quý"
    }
    result.can = can;
    result.chi = chi;
    return result;
  }

  //Tính Can Chi theo Ngày (đầu vào theo dương lịch)
  getSexagesimalCycleByDay(date: number, month: number, year: number) : CanChi {
    let can: string;
    let chi: string;
    let result: CanChi;
    let N: number = Math.floor(this.convertDDMMYYToJulius(date, month, year));

    if (Math.floor(((N + 9) % 10)) == 0) {
      can = "Giáp"
    }
    if (Math.floor(((N + 9) % 10)) == 1) {
      can = "Ất"
    }
    if (Math.floor(((N + 9) % 10)) == 2) {
      can = "Bính"
    }
    if (Math.floor(((N + 9) % 10)) == 3) {
      can = "Đinh"
    }
    if (Math.floor(((N + 9) % 10)) == 4) {
      can = "Mậu"
    }
    if (Math.floor(((N + 9) % 10)) == 5) {
      can = "Kỷ"
    }
    if (Math.floor(((N + 9) % 10)) == 6) {
      can = "Canh"
    }
    if (Math.floor(((N + 9) % 10)) == 7) {
      can = "Tân"
    }
    if (Math.floor(((N + 9) % 10)) == 8) {
      can = "Nhâm"
    }
    if (Math.floor(((N + 9) % 10)) == 9) {
      can = "Quý"
    }
    if (Math.floor(((N + 1) % 12)) == 0) {
      chi = "Tý"
    }
    if (Math.floor(((N + 1) % 12)) == 1) {
      chi = "Sửu"
    }
    if (Math.floor(((N + 1) % 12)) == 2) {
      chi = "Dần"
    }
    if (Math.floor(((N + 1) % 12)) == 3) {
      chi = "Mão"
    }
    if (Math.floor(((N + 1) % 12)) == 4) {
      chi = "Thìn"
    }
    if (Math.floor(((N + 1) % 12)) == 5) {
      chi = "Tỵ"
    }
    if (Math.floor(((N + 1) % 12)) == 6) {
      chi = "Ngọ"
    }
    if (Math.floor(((N + 1) % 12)) == 7) {
      chi = "Mùi"
    }
    if (Math.floor(((N + 1) % 12)) == 8) {
      chi = "Thân"
    }
    if (Math.floor(((N + 1) % 12)) == 9) {
      chi = "Dậu"
    }
    if (Math.floor(((N + 1) % 12)) == 10) {
      chi = "Tuất"
    }
    if (Math.floor(((N + 1) % 12)) == 11) {
      chi = "Hợi"
    }
    result.can = can;
    result.chi = chi;
    return result;
  }

  //Tính ngày hoàng đạo, hắc đạo
  getZodiacDay(date: number, month: number, year: number) : number {
    let lunarmonth = this.convertSolarToLunar(date, month, year).month;
    let temp: CanChi = this.getSexagesimalCycleByDay(date, month, year);
    let can = temp.can;
    let chi = temp.chi;
    if (lunarmonth == 1 || lunarmonth == 7) {
      if (chi == "Tý" || chi == "Sửu" || chi == "Tỵ" || chi == "Mùi") {
        return 1;
      } else if (chi == "Ngọ" || chi == "Mão" || chi == "Hợi" || chi == "Dậu") {
        return 2;
      } else {
        return 0;
      }
    }

    if (lunarmonth == 2 || lunarmonth == 8) {
      if (chi == "Dần" || chi == "Mão" || chi == "Mùi" || chi == "Dậu") {
        return 1;
      } else if (chi == "Thân" || chi == "Tỵ" || chi == "Hợi" || chi == "Sửu") {
        return 2;
      } else {
        return 0;
      }
    }

    if (lunarmonth == 3 || lunarmonth == 9) {
      if (chi == "Thìn" || chi == "Tỵ" || chi == "Dậu" || chi == "Hợi") {
        return 1;
      } else if (chi == "Tuất" || chi == "Mùi" || chi == "Mão" || chi == "Sửu") {
        return 2;
      } else {
        return 0;
      }
    }

    if (lunarmonth == 4 || lunarmonth == 10) {
      if (chi == "Ngọ" || chi == "Sửu" || chi == "Hợi" || chi == "Mùi") {
        return 1;
      } else if (chi == "Tý" || chi == "Dậu" || chi == "Tỵ" || chi == "Mão") {
        return 2;
      } else {
        return 0;
      }
    }

    if (lunarmonth == 5 || lunarmonth == 11) {
      if (chi == "Thân" || chi == "Sửu" || chi == "Dậu" || chi == "Mão") {
        return 1;
      } else if (chi == "Dần" || chi == "Mùi" || chi == "Hợi" || chi == "Tỵ") {
        return 2;
      } else {
        return 0;
      }
    }

    if (lunarmonth == 6 || lunarmonth == 12) {
      if (chi == "Tuất" || chi == "Hợi" || chi == "Tỵ" || chi == "Mão") {
        return 1;
      } else if (chi == "Thìn" || chi == "Sửu" || chi == "Mùi" || chi == "Dậu") {
        return 2;
      } else {
        return 0;
      }
    }
  }
  //tính can của ngày
  getCanDay(date: number, month: number, year: number): string {
    let result: string;
    let N: number = Math.floor( this.convertDDMMYYToJulius(date, month, year) );
    let tempCalculation: number = Math.floor(((N + 9) % 10));
    switch (tempCalculation) {
      case 0:
        result = "Giáp";
        break;
      case 1:
        result = "Ất";
        break;
      case 2:
        result = "Bính";
        break;
      case 3:
        result = "Đinh";
        break;
      case 4:
        result = "Mậu";
        break;
      case 5:
        result = "Kỷ";
        break;
      case 6:
        result = "Canh";
        break;
      case 7:
        result = "Nhâm";
        break;
      case 8:
        result = "Tân";
        break;
      case 9:
        result = "Quý";
        break;
      default:
        break;
    }
    return result;
  }

  //quy đổi giờ sang 12 canh
  exchangetoZodiacTime(hour: number): string {
    let result: string;
    if (hour >= 1 && hour < 3) {
      result = "Sửu"
    } else if (hour >= 3 && hour < 5) {
      result = "Dần"
    } else if (hour >= 5 && hour < 7) {
      result = "Mão"
    } else if (hour >= 7 && hour < 9) {
      result = "Thìn"
    } else if (hour >= 9 && hour < 11) {
      result = "Tỵ"
    } else if (hour >= 11 && hour < 13) {
      result = "Ngọ"
    } else if (hour >= 13 && hour < 15) {
      result = "Mùi"
    } else if (hour >= 15 && hour < 17) {
      result = "Thân"
    } else if (hour >= 17 && hour < 19) {
      result = "Dậu"
    } else if (hour >= 19 && hour < 21) {
      result = "Tuất"
    } else if (hour >= 21 && hour < 23) {
      result = "Hợi"
    } else if (hour >= 23 && hour <= 24) {
      result = "Tý"
    } else if (hour >= 0 && hour < 1) {
      result = "Tý"
    }
    return result;
  }

  //lấy dữ liệu từ bảng dữ liệu can của giờ
  getDataFromZodiacTime(can: String, canh: String): string {
    let result: string;
    for (let x of ZODIACTIME) {
      for (let y of x.can) {
        if (can == y) {
          if (canh == "Tý") {
            result = x.ti;
          } else if (canh == "Sửu") {
            result = x.suu;
          } else if (canh == "Dần") {
            result = x.dan;
          } else if (canh == "Mão") {
            result = x.mao;
          } else if (canh == "Thìn") {
            result = x.thin;
          } else if (canh == "Tỵ") {
            result = x.ty;
          } else if (canh == "Ngọ") {
            result = x.ngo;
          } else if (canh == "Mùi") {
            result = x.mui;
          } else if (canh == "Thân") {
            result = x.than;
          } else if (canh == "Dậu") {
            result = x.dau;
          } else if (canh == "Tuất") {
            result = x.tuat;
          } else if (canh == "Hợi") {
            result = x.hoi;
          }
        }
      }
    }
    return result;
  }

  //tính can chi cho giờ 
  getSexagesimalCycleByTime(dd: any, mm: any, yy: any, hour: number): string {
    let result: string;
    let can: string = this.getCanDay(dd, mm, yy);
    let canh: string = this.exchangetoZodiacTime(hour);
    result = this.getDataFromZodiacTime(can, canh);
    return result;
  }

  //Tính năm nhuận. Trả về số ngày nhuận
  isLeap(year) {
    if ((year % 4) || ((year % 100 === 0) && (year % 400))) return 0;
    else return 1;
  }

  //Tính số ngày của một tháng
  daysInMonth(month, year) {
    return (month === 2) ? (28 + this.isLeap(year)) : 31 - (month - 1) % 7 % 2;
  }

}
