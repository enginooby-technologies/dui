// import WebFont from "webfontloader";
import { insertEmptyRule } from '../global.js';
import * as DynamicSelectors from '../selectors/DynamicSelectors.js';
import { DynamicUI } from "./DynamicUI.js";
class FontPreset {
    constructor(fontFamily, scale, lineHeight, letterSpacing, fallbackFonts = "") {
        this.fontFamily = fontFamily;
        this.scale = scale;
        this.lineHeight = lineHeight;
        this.letterSpacing = letterSpacing;
        this.fallbackFonts = fallbackFonts;
    }
}
// TODO: cache all selectors
export class DynamicFont {
    constructor() {
        this.fontPresets = [];
        this.downloadedFontFamilies = ["Agency FB"]; // initialize with local fonts
        this.getFontRule = () => { var _a; return (_a = this.fontRule) !== null && _a !== void 0 ? _a : (this.fontRule = insertEmptyRule(DynamicSelectors.fontSelectors)); };
        this.getFontScaleRule = () => { var _a; return (_a = this.fontScaleRule) !== null && _a !== void 0 ? _a : (this.fontScaleRule = insertEmptyRule(DynamicSelectors.fontScaleSelectors)); };
        this.initialFontSizes = new Map();
        this.fontPresets = [
            new FontPreset('Agency FB', 1, 1.45, 1),
            new FontPreset('Ubuntu', 0.8, 1.4, 0.5),
            new FontPreset('Style Script', 1, 1.45, 2.3),
            new FontPreset('BioRhyme', 0.81, 1.35, -8.3),
            new FontPreset('Roboto', 0.96, 1.25, -5.3),
            new FontPreset('Special Elite', 0.84, 1.45, -7),
            new FontPreset('Press Start 2P', 0.58, 1.6, -10, ', cursive'),
        ];
        this.currentFontPreset = this.fontPresets[0];
        this.previousFontPreset = this.fontPresets[0];
        this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label p");
        this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
        this.setRangeSliderValue("#range-slider_size-scale", this.currentFontPreset.scale);
        this.setRangeSliderValue("#range-slider_line-height", this.currentFontPreset.lineHeight);
        this.applyFontPreset(this.currentFontPreset);
        this.setupEvents();
    }
    applyFontPreset(fontPreset) {
        var _a, _b, _c, _d, _e, _f;
        this.currentFontPreset = fontPreset;
        (_a = DynamicUI.$body) === null || _a === void 0 ? void 0 : _a.removeClass(this.formatFontFamily((_b = this.previousFontPreset) === null || _b === void 0 ? void 0 : _b.fontFamily));
        (_c = DynamicUI.$body) === null || _c === void 0 ? void 0 : _c.addClass(this.formatFontFamily(this.currentFontPreset.fontFamily));
        if (((_d = this.previousFontPreset) === null || _d === void 0 ? void 0 : _d.letterSpacing) != this.currentFontPreset.letterSpacing) {
            this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
            this.updateLetterSpacing();
        }
        if (((_e = this.previousFontPreset) === null || _e === void 0 ? void 0 : _e.lineHeight) != this.currentFontPreset.lineHeight) {
            this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
            this.updateLineHeight();
        }
        if (((_f = this.previousFontPreset) === null || _f === void 0 ? void 0 : _f.scale) != this.currentFontPreset.scale) {
            this.setRangeSliderValue("#range-slider_size-scale", this.currentFontPreset.scale);
            this.updateSizeScale();
        }
    }
    // format to class name (Foo Bar->foo-bar-font) which is added to <body> 
    //so that each project customize things based on current font
    formatFontFamily(fontFamily) {
        return fontFamily.replace(' ', '-').toLowerCase() + '-font';
    }
    //HELPER
    setRangeSliderValue(selector, value) {
        const $slider = $(selector);
        $slider.attr('value', value);
        $slider.next('.range-slider__value').html(value.toString());
    }
    setupEvents() {
        $("#dropdown-font-family .dropdown-item").each((index, element) => {
            $(element).on("click", (event) => {
                const fontName = $(element).text();
                this.loadThenApplyFontFamily(fontName);
            });
        });
        $("#font-panel ,range-slider input").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'range-slider_line-height':
                    this.currentFontPreset.lineHeight = parseFloat(newValue);
                    this.updateLineHeight();
                    break;
                case 'range-slider_letter-spacing':
                    this.currentFontPreset.letterSpacing = parseFloat(newValue);
                    this.updateLetterSpacing();
                    break;
                case 'range-slider_size-scale':
                    this.currentFontPreset.scale = parseFloat(newValue);
                    this.updateSizeScale();
            }
        });
    }
    loadThenApplyFontFamily(fontFamily) {
        this.$dropdownLabelFontFamily.text(fontFamily);
        if (this.downloadedFontFamilies.includes(fontFamily)) {
            this.applyFontFamily(fontFamily);
        }
        else {
            this.downloadFont(fontFamily);
        }
    }
    downloadFont(fontFamily) {
        // @ts-ignore
        WebFont.load({
            google: {
                families: [fontFamily],
            },
            timeout: 2000,
            active: () => {
                this.downloadedFontFamilies.push(fontFamily);
                this.applyFontFamily(fontFamily);
            },
            inactive: () => { }
        });
    }
    applyFontFamily(fontFamily) {
        let preset = this.getFontPresetByFamily(fontFamily);
        if (!preset) {
            preset = new FontPreset(fontFamily, 1, 1.45, 1);
            this.fontPresets.push(preset);
        }
        this.previousFontPreset = this.currentFontPreset;
        this.currentFontPreset = preset;
        this.getFontRule().style.setProperty('font-family', `'${preset.fontFamily}' ${preset.fallbackFonts}`, 'important');
        this.applyFontPreset(this.currentFontPreset);
    }
    getFontPresetByFamily(fontFamily) {
        for (let i = 0; i < this.fontPresets.length; i++) {
            if (this.fontPresets[i].fontFamily == fontFamily) {
                return this.fontPresets[i];
            }
        }
        return null;
    }
    updateSizeScale() {
        this.getFontScaleRule().style.setProperty('zoom', this.currentFontPreset.scale.toString());
    }
    updateLetterSpacing() {
        this.getFontRule().style.setProperty('letter-spacing', `${this.currentFontPreset.letterSpacing / 100}rem`, 'important');
    }
    updateLineHeight() {
        this.getFontRule().style.setProperty('line-height', this.currentFontPreset.lineHeight.toString());
    }
}
