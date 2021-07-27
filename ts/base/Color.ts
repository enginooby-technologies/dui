// export const lightBaseValue: string = "#EBEBEB";
// export const darkBaseValue: string = "#212529";

export abstract class Color {
        //CONSIDER: Use private members with getters instead?
        public hex: string;
        public rValue: number;
        public bValue: number;
        public gValue: number;

        constructor(hex: string) {
                this.hex = hex;
                this.rValue = this.extractR(hex);
                this.bValue = this.extractB(hex);
                this.gValue = this.extractG(hex);
        }

        public setHex(hex: string) {
                this.hex = hex;
                this.rValue = this.extractR(hex);
                this.bValue = this.extractB(hex);
                this.gValue = this.extractG(hex);
        }

        public abstract getLighten(amount: number): string;
        public abstract getDarken(amount: number): string;

        protected extractR(hex: string) { return parseInt((this.cutHex(hex)).substring(0, 2), 16) }
        protected extractG(hex: string) { return parseInt((this.cutHex(hex)).substring(2, 4), 16) }
        protected extractB(hex: string) { return parseInt((this.cutHex(hex)).substring(4, 6), 16) }
        protected cutHex(hex: string) { return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex }

        public getInvertBlackWhite(): string {
                // http://stackoverflow.com/a/3943023/112731
                return (this.rValue * 0.299 + this.gValue * 0.587 + this.bValue * 0.114) > 186 ? '#000000' : '#ffffff';     //darkBaseValue : lightBaseValue;
        }

        public getInvert() {
                // invert color components
                const rString: string = (255 - this.rValue).toString(16);
                const bString: string = (255 - this.bValue).toString(16);
                const gString: string = (255 - this.gValue).toString(16);
                // pad each with zeros and return hex
                return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
        }

        protected padZero(str: string, len?: number) {
                len = len || 2;
                let zeros = new Array(len).join('0');
                return (zeros + str).slice(-len);
        }
}