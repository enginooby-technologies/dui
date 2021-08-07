// import tinycolor from "/assets/js/import/tinycolor.js";      // Import like this will make tsc compiler to copy source file into outDir as well?!
// import tinycolor from "tinycolor2"  ;        // Import like this, has to run Node.js server
import { Color } from "./Color.js";
// TODO: Create my own algorithms for functions and remove TinyColor dependency
export class TinyColor extends Color {
    getLighten(amount) {
        // @ts-ignore
        return tinycolor(this.hex).lighten(amount).toString();
    }
    getDarken(amount) {
        // @ts-ignore
        return tinycolor(this.hex).darken(amount).toString();
    }
}
