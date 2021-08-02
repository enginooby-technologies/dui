// import WebFont from "webfontloader";
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { DynamicUI } from "./DynamicUI.js";
export class DynamicFont {
    constructor() {
        this.currentLineHeight = 1.45;
        this.getFontRule = () => { var _a; return (_a = this.fontRule) !== null && _a !== void 0 ? _a : (this.fontRule = DynamicUI.insertEmptyRule(DynamicSelectors.fontSelectors)); };
        this.initRangeSlider("#range-slider_line-height", this.currentLineHeight);
        this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label");
        this.setupEvents();
    }
    //HELPER
    initRangeSlider(selector, value) {
        const $slider = $(selector);
        $slider.attr('value', value);
        $slider.next('.range-slider__value').html(value.toString());
    }
    setupEvents() {
        $("#dropdown-font-family .dropdown-item").each((index, element) => {
            $(element).on("click", (event) => {
                const fontName = $(element).text();
                this.$dropdownLabelFontFamily.text(fontName);
                this.loadFontByWebFontLoader(fontName);
            });
        });
        $("#font-panel ,range-slider input").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'range-slider_line-height':
                    this.currentLineHeight = parseFloat(newValue);
                    this.updateLineHeight();
                    break;
            }
        });
    }
    updateLineHeight() {
        this.getFontRule().style.setProperty('line-height', this.currentLineHeight.toString());
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
