// import tinycolor from "/assets/js/import/tinycolor.js";      // Import like this will make tsc compiler to copy source file into outDir as well?!
// import tinycolor from "tinycolor2"  ;        // Import like this, has to run Node.js server
import { Color } from "./Color.js";

// TODO: Create my own algorithms for functions and remove TinyColor dependency
export class TinyColor extends Color {
  public getHexByHsl(): string {
    // @ts-ignore
    return tinycolor(this.hsl).toHexString();
  }
  public getHslByHex(): string {
    // @ts-ignore
    return tinycolor(this.hex).toHslString();
  }
  getLighten(amount: number): string {
    // @ts-ignore
    return tinycolor(this.hex)!.lighten(amount).toString();
  }
  getDarken(amount: number): string {
    // @ts-ignore
    return tinycolor(this.hex)!.darken(amount).toString();
  }
}