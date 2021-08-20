// export const lightBaseValue: string = "#EBEBEB";
// export const darkBaseValue: string = "#212529";

export abstract class Color {
        //CONSIDER: Use private members with getters instead?
        public hex: string;
        public rVal: number;
        public bVal: number;
        public gVal: number;

        public hsl: string;
        public hVal: string;
        public sVal: string;
        public lVal: string;

        constructor(hsl: string) {
                this.hsl = hsl;
                [this.hVal, this.sVal, this.lVal] = this.hsl.replace(/[^\d,.%]/g, '').split(',');
                this.hex = this.getHexByHsl();
                this.rVal = this.extractR(this.hex);
                this.bVal = this.extractB(this.hex);
                this.gVal = this.extractG(this.hex);
        }

        public abstract getHexByHsl(): string;
        public abstract getHslByHex(): string;
        public abstract getLighten(amount: number): string;
        public abstract getDarken(amount: number): string;

        public setHex(hex: string) {
                this.hex = hex;
                this.rVal = this.extractR(hex);
                this.bVal = this.extractB(hex);
                this.gVal = this.extractG(hex);

                this.hsl = this.getHslByHex();
                [this.hVal, this.sVal, this.lVal] = this.hsl.replace(/[^\d,.%]/g, '').split(',');
        }

        public getContrastL() {
                return parseInt(this.lVal) > 60 ? "0%" : "100%";
        }

        protected extractR(hex: string) { return parseInt((this.cutHex(hex)).substring(0, 2), 16) }
        protected extractG(hex: string) { return parseInt((this.cutHex(hex)).substring(2, 4), 16) }
        protected extractB(hex: string) { return parseInt((this.cutHex(hex)).substring(4, 6), 16) }
        protected cutHex(hex: string) { return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex }

        public getInvertBlackWhite(): string {
                // http://stackoverflow.com/a/3943023/112731
                return (this.rVal * 0.299 + this.gVal * 0.587 + this.bVal * 0.114) > 186 ? '#000000' : '#ffffff';     //darkBaseValue : lightBaseValue;
        }

        public getInvert() {
                // invert color components
                const rString: string = (255 - this.rVal).toString(16);
                const bString: string = (255 - this.bVal).toString(16);
                const gString: string = (255 - this.gVal).toString(16);
                // pad each with zeros and return hex
                return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
        }

        protected padZero(str: string, len?: number) {
                len = len || 2;
                let zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
        }
}