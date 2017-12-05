import { Injectable } from '@angular/core';

/*
  Generated class for the AppUltilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppUltilsProvider {
  static JANUARY: number = 1;
  static FEBRUARY: number = 2;
  static MARCH: number = 3;
  static APRIL: number = 4;
  static MAY: number = 5;
  static JUNE: number = 6;
  static JULY: number = 7;
  static AUGUST: number = 8;
  static SEPTEMBER: number = 9;
  static OCTORBER: number = 10;
  static NOVEMBER: number = 11;
  static DECEMBER: number = 12;
  static CANS: Array<string> = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  static CHIS: Array<string> = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  static day_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  static day_in_months_nhuan = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  constructor() {
    console.log('Hello AppUltilsProvider Provider');
  }


  /**Trả về số ngày trong 1 tháng của 1 năm. 
   * @argument mm : Kiểu số, tháng cần tính, bắt đầu từ 0 (cho tháng 1).
   * @argument yy : Kiểu số, năm cần tính.
   * 
   *
   */
  public static getDaysInMonth(mm: number, yy: number): number {
    if (mm < 0) mm = 0;
    if (mm >= this.day_in_months.length) mm = this.day_in_months.length - 1;
    if (yy % 4 == 0) {
      return this.day_in_months_nhuan[mm];
    }
    return this.day_in_months[mm];
  }

  public static clamp(value: number, min: number, max: number): number {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
}
