// import WebFont from "webfontloader";
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { DynamicUI } from "./DynamicUI.js";
export class DynamicFont {
    constructor() {
        this.getFontRule = () => { var _a; return (_a = this.fontRule) !== null && _a !== void 0 ? _a : (this.fontRule = DynamicUI.insertEmptyRule(DynamicSelectors.fontSelectors)); };
        this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label");
        this.setupEvent();
    }
    setupEvent() {
        $("#dropdown-font-family .dropdown-item").each((index, element) => {
            $(element).on("click", (event) => {
                const fontName = $(element).text();
                this.$dropdownLabelFontFamily.text(fontName);
                this.loadFontByWebFontLoader(fontName);
            });
        });
    }
    loadFontByWebFontLoader(fontFamily) {
        // @ts-ignore
        WebFont.load({
            google: {
                families: [fontFamily],
            },
            timeout: 2000,
            active: () => {
                this.applyFontFamily(fontFamily);
            },
            inactive: () => {
            }
        });
    }
    applyFontFamily(fontFamily) {
        this.getFontRule().style.setProperty('font-family', fontFamily, 'important');
    }
    loadFontByFontFace() {
        var junction_font = new FontFace('Palette Mosaic', 'url(https://fonts.googleapis.com/css2?family=Palette+Mosaic)', { style: 'bold', weight: '700' });
        junction_font.load().then(function (loaded_face) {
            console.log(' font loaded');
            $('h2').css('font-family', 'Palette Mosaic, cursive');
            document.fonts.add(loaded_face);
            document.body.style.fontFamily = '"Junction Regular", Arial';
        }).catch(function (error) {
            // error occurred
            // $('h2').css('font-family', 'Palette Mosaic, cursive');
            document.fonts.add(junction_font);
            document.body.style.fontFamily = '"Palette Mosaic", cursive';
            console.log(' failed');
        });
    }
}
