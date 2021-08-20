// export const lightBaseValue: string = "#EBEBEB";
// export const darkBaseValue: string = "#212529";
export class Color {
  constructor(hsl) {
    this.hsl = hsl;
    [this.hVal, this.sVal, this.lVal] = this.hsl.replace(/[^\d,.%]/g, '').split(',');
    this.hex = this.getHexByHsl();
    this.rVal = this.extractR(this.hex);
    this.bVal = this.extractB(this.hex);
    this.gVal = this.extractG(this.hex);
  }
  setHex(hex) {
    this.hex = hex;
    this.rVal = this.extractR(hex);
    this.bVal = this.extractB(hex);
    this.gVal = this.extractG(hex);
    this.hsl = this.getHslByHex();
    [this.hVal, this.sVal, this.lVal] = this.hsl.replace(/[^\d,.%]/g, '').split(',');
  }
  getContrastL() {
    return parseInt(this.lVal) > 60 ? "0%" : "100%";
  }
  extractR(hex) { return parseInt((this.cutHex(hex)).substring(0, 2), 16); }
  extractG(hex) { return parseInt((this.cutHex(hex)).substring(2, 4), 16); }
  extractB(hex) { return parseInt((this.cutHex(hex)).substring(4, 6), 16); }
  cutHex(hex) { return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex; }
  getInvertBlackWhite() {
    // http://stackoverflow.com/a/3943023/112731
    return (this.rVal * 0.299 + this.gVal * 0.587 + this.bVal * 0.114) > 186 ? '#000000' : '#ffffff'; //darkBaseValue : lightBaseValue;
  }
  getInvert() {
    // invert color components
    const rString = (255 - this.rVal).toString(16);
    const bString = (255 - this.bVal).toString(16);
    const gString = (255 - this.gVal).toString(16);
    // pad each with zeros and return hex
    return "#" + this.padZero(rString) + this.padZero(gString) + this.padZero(bString);
  }
  padZero(str, len) {
    len = len || 2;
    let zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
  }
}
