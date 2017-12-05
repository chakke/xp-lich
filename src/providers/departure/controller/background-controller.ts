import { Utils } from "../../app-utils";

export class Background {
    mImage: string = "";
    mColor: string = "";
    mId: number = -1;

    constructor() {
        this.reset();
    }

    onData(data) {
        if (data) {
            this.setColor(data.color);
            this.setImageUrl(data.image);
        }
    }


    public reset(): void {
        this.mImage = "./assets/departure/backgrounds/default.png";
        this.mColor = "";
        this.mId = -1;
    }

    public getId(): number {
        return this.mId;
    }
    public setId(id: number): void {
        this.mId = id;
    }

    public getColor(): string {
        return this.mColor;
    }
    public setColor(color: string): void {
        this.mColor = color;
    }

    public getImageUrl(): string {
        return this.mImage;
    }
    public setImageUrl(image: string): void {
        this.mImage = image;
    }


}

export class BackgroundController {
    public mBackgrounds: Array<Background> = [];

    onData(data) {
        if (data) {
            this.mBackgrounds = [];
            for (let backgroundData of data) {
                let background = new Background();
                background.onData(backgroundData);
                this.mBackgrounds.push(background);
            }
        }
    }

    getBackgroundImage(dd: number, mm: number, yy: number): Background {
        if (this.mBackgrounds.length == 0) return new Background();
        return this.mBackgrounds[Utils.clamp(dd, 0, this.mBackgrounds.length)];
    }

    getNextBackground(bg: Background): Background {
        for (let i = 0; i < this.mBackgrounds.length; i++) {
            if (this.mBackgrounds[i].mId == bg.getId()) {
                let idx = i + 1;
                if (idx >= this.mBackgrounds.length) idx = 0;
                return this.mBackgrounds[idx];
            }
        }
        return new Background();
    }

    getPreviousBackground(bg: Background): Background {
        for (let i = 0; i < this.mBackgrounds.length; i++) {
            if (this.mBackgrounds[i].mId == bg.getId()) {
                let idx = i - 1;
                if (idx < 0) idx = this.mBackgrounds.length - 1;
                return this.mBackgrounds[idx];
            }
        }

        return new Background();
    }
}