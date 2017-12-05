export class DDMMYYDays {
    day: number;
    month: number;
    year: number;

    constructor(data?: any) {
        this.day = 12;
        this.month = 1;
        this.year = 1900;
        if (data) {
            this.pair(data);
        }
    }

    pair(data: any) {
        if (data.day) this.day = data.day;
        if (data.month) this.month = data.month;
        if (data.year) this.year = data.year;
    }

    setDay(dd: number, mm: number, yy: number){
        this.day = dd;
        this.month = mm;
        this.year = yy;
    }
}