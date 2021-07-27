// export const lightBaseValue: string = "#EBEBEB";
// export const darkBaseValue: string = "#212529";
export class Color {
    constructor(hex) {
        this.hex = hex;
        this.rValue = this.extractR(hex);
        this.bValue = this.extractB(hex);
        this.gValue = this.extractG(hex);
    }
    setHex(hex) {
        this.hex = hex;
        this.rValue = this.extractR(hex);
        this.bValue = this.extractB(hex);
        this.gValue = this.extractG(hex);
    }
    extractR(hex) { return parseInt((this.cutHex(hex)).substring(0, 2), 16); }
    extractG(hex) { return parseInt((this.cutHex(hex)).substring(2, 4), 16); }
    extractB(hex) { return parseInt((this.cutHex(hex)).substring(4, 6), 16); }
    cutHex(hex) { return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex; }
    getInvertBlackWhite() {
        // http://stackoverflow.com/a/3943023/112731
        return (this.rValue * 0.299 + this.gValue * 0.587 + this.bValue * 0.114) > 186 ? '#000000' : '#ffffff'; //darkBaseValue : lightBaseValue;
    }
    getInvert() {
        // invert color components
        const rString = (255 - this.rValue).toString(16);
        const bString = (255 - this.bValue).toString(16);
        const gString = (255 - this.gValue).toString(16);
        // pad each with zeros and return hex
        return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
    }
    padZero(str, len) {
        len = len || 2;
        let zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
}
