// import WebFont from "webfontloader";
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
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
        this.getFontRule = () => { var _a; return (_a = this.fontRule) !== null && _a !== void 0 ? _a : (this.fontRule = DynamicUI.insertEmptyRule(DynamicSelectors.fontSelectors)); };
        this.fontPresets = [
            new FontPreset('Agency FB', 1, 1.45, 1),
            new FontPreset('Ubuntu', 0.8, 1.4, 0.5),
            new FontPreset('Style Script', 1, 1.45, 2.3),
            new FontPreset('BioRhyme', 0.81, 1.35, -8.3),
            new FontPreset('Roboto', 0.96, 1.25, -8.7),
            new FontPreset('Special Elite', 0.84, 1.45, -7),
            new FontPreset('Press Start 2P', 0.58, 1.6, -10, ', cursive'),
        ];
        this.currentFontPreset = this.fontPresets[0];
        this.previousFontPreset = this.fontPresets[0];
        this.applyFontPreset(this.currentFontPreset);
        this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label");
        this.setupEvents();
    }
    applyFontPreset(fontPreset) {
        var _a, _b, _c, _d, _e;
        this.currentFontPreset = fontPreset;
        if (((_a = this.previousFontPreset) === null || _a === void 0 ? void 0 : _a.letterSpacing) != this.currentFontPreset.letterSpacing) {
            this.setRangeSliderValue("#range-slider_letter-spacing", this.currentFontPreset.letterSpacing);
            this.updateLetterSpacing();
        }
        if (((_b = this.previousFontPreset) === null || _b === void 0 ? void 0 : _b.lineHeight) != this.currentFontPreset.lineHeight) {
            this.setRangeSliderValue("#range-slider_line-height", this.currentFontPreset.lineHeight);
            this.updateLineHeight();
        }
        if (((_c = this.previousFontPreset) === null || _c === void 0 ? void 0 : _c.scale) != this.currentFontPreset.scale) {
            this.setRangeSliderValue("#range-slider_size-scale", this.currentFontPreset.scale);
            // restore to original size before scaling , meanwhile disable slider
            this.setSizeScale(1 / ((_e = (_d = this.previousFontPreset) === null || _d === void 0 ? void 0 : _d.scale) !== null && _e !== void 0 ? _e : 1));
            $("input#range-slider_size-scale ").prop('disabled', true);
            // add a delay to ensure finish restoring first
            setTimeout(() => {
                this.setSizeScale(this.currentFontPreset.scale);
                $("input#range-slider_size-scale ").prop('disabled', false);
            }, 250);
        }
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
                    // restore to original size before scaling , meanwhile disable slider
                    this.setSizeScale(1 / this.currentFontPreset.scale);
                    $("input#range-slider_size-scale ").prop('disabled', true);
                    this.currentFontPreset.scale = parseFloat(newValue);
                    // add a delay to ensure finish restoring first
                    setTimeout(() => {
                        this.setSizeScale(this.currentFontPreset.scale);
                        $("input#range-slider_size-scale ").prop('disabled', false);
                    }, 300);
                    break;
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
        // console.log('downloading ' + fontFamily)
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
    // TOFIX: this will not affect texts which appears after scaling, consider using CSSStyleRule
    setSizeScale(scale) {
        // TOFIX: missing elements when try caching this JQuery<HTMLElement>
        $(DynamicSelectors.fontScaleSelectors).each((index, element) => {
            const $text = $(element);
            const currentSizeText = $text.css('font-size');
            const currentSize = parseFloat(currentSizeText.replace('px', ''));
            //TOFIX: this method leaves dirty rule traces
            $text.attr('style', function (i, s) { return (s || '') + `font-size: ${currentSize * scale}px !important;`; });
            // $text.css('font-size', `${currentSize * scale}px`);
        });
    }
    updateLetterSpacing() {
        this.getFontRule().style.setProperty('letter-spacing', `${this.currentFontPreset.letterSpacing / 100}rem`, 'important');
    }
    updateLineHeight() {
        this.getFontRule().style.setProperty('line-height', this.currentFontPreset.lineHeight.toString());
    }
}
