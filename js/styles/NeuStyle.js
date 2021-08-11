import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { NeuConfig } from '../StyleConfig.js';
var BorderStyle;
(function (BorderStyle) {
    BorderStyle[BorderStyle["solid"] = 0] = "solid";
    BorderStyle[BorderStyle["double"] = 1] = "double";
    BorderStyle[BorderStyle["dotted"] = 2] = "dotted";
    BorderStyle[BorderStyle["dashed"] = 3] = "dashed";
})(BorderStyle || (BorderStyle = {}));
; // order must matchs with id from HTML radio
// REFACTOR: generic singleton
export class NeuStyle extends Style {
    constructor() {
        super(NeuConfig);
        this.distanceX = 3;
        this.distanceY = 3;
        this.blur = 4;
        this.spread = 0;
        this.lightenIntensity = 6.9;
        this.darkenIntensity = 6.9;
        this.schemeColorLighten = "#e6e6e6";
        this.schemeColorDarken = "#c2c2c2";
        this.borderWidth = 0;
        this.borderBrightness = -6.9;
        // TODO: implement border style
        this.borderStyle = BorderStyle.solid;
        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        this.surfaceCurvature = 0;
        this.bgSurface = '';
    }
    static get Instance() {
        var _a;
        (_a = NeuStyle._instance) !== null && _a !== void 0 ? _a : (NeuStyle._instance = new NeuStyle());
        return NeuStyle._instance;
    }
    init() {
        this.initRangeSliders();
        // TODO: Init radio button
    }
    onDisable() { }
    initRangeSliders() {
        this.initRangeSlider('#neu-distance-x', this.distanceX);
        this.initRangeSlider('#neu-distance-y', this.distanceY);
        this.initRangeSlider('#blur', this.blur);
        this.initRangeSlider('#neu-spread', this.spread);
        this.initRangeSlider('#light-intensity', this.lightenIntensity);
        this.initRangeSlider('#dark-intensity', this.darkenIntensity);
        this.initRangeSlider('#neu-border-width', this.borderWidth);
        this.initRangeSlider('#neu-border-brightness', this.borderBrightness);
        this.initRangeSlider('#surface-curvature', this.surfaceCurvature);
    }
    //HELPER
    initRangeSlider(selector, value) {
        const $slider = $(selector);
        $slider.attr('value', value);
        $slider.next('.range-slider__value').html(value.toString());
    }
    setupCustomizeEvents() {
        $("#neu-customizer ,range-slider input").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'neu-distance-x':
                    this.distanceX = parseInt(newValue);
                    this.cssRule.style.setProperty('--distance-x', newValue + 'px');
                    break;
                case 'neu-distance-y':
                    this.distanceY = parseInt(newValue);
                    this.cssRule.style.setProperty('--distance-y', newValue + 'px');
                    break;
                case 'blur':
                    this.blur = parseInt(newValue);
                    this.cssRule.style.setProperty('--blur', newValue + 'px');
                    break;
                case 'neu-spread':
                    this.spread = parseInt(newValue);
                    this.cssRule.style.setProperty('--spread', newValue + 'px');
                    break;
                case 'light-intensity':
                    this.lightenIntensity = parseInt(newValue);
                    this.updateSchemeLighten();
                    break;
                case 'dark-intensity':
                    this.darkenIntensity = parseInt(newValue);
                    this.updateSchemeDarken();
                    break;
                case 'neu-border-width':
                    this.borderWidth = parseInt(newValue);
                    this.updateBorder();
                    return;
                case 'neu-border-brightness':
                    this.borderBrightness = parseInt(newValue);
                    this.updateBorder();
                    return;
                case 'surface-curvature':
                    this.surfaceCurvature = parseInt(newValue);
                    this.updateSurface();
                    return;
            }
        });
        $('#neu-customizer #neu-border-style-options input').on('input', event => {
            this.borderStyle = parseInt(event.currentTarget.getAttribute('value'));
            this.updateBorder();
        });
    }
    onHighlightColorUpdated() {
    }
    onSchemeColorUpdated() {
        this.updateSurface();
        this.updateBorder();
        this.updateSchemeLighten();
        this.updateSchemeDarken();
    }
    updateSchemeLighten() {
        this.schemeColorLighten = DynamicColor.schemeColor.getLighten(this.lightenIntensity);
        this.cssRule.style.setProperty('--scheme-color-lighten', this.schemeColorLighten);
    }
    updateSchemeDarken() {
        this.schemeColorDarken = DynamicColor.schemeColor.getDarken(this.darkenIntensity);
        this.cssRule.style.setProperty('--scheme-color-darken', this.schemeColorDarken);
    }
    onBaseColorUpdated() {
    }
    updateSurface() {
        const leftSurfaceColor = DynamicColor.schemeColor.getLighten(this.surfaceCurvature);
        const rightSurfaceColor = DynamicColor.schemeColor.getDarken(this.surfaceCurvature);
        this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`;
    }
    updateBorder() {
        const borderColor = DynamicColor.schemeColor.getLighten(this.borderBrightness);
        const borderStyle = `${this.borderWidth}px ${BorderStyle[this.borderStyle]} ${borderColor}`;
    }
}
//  Singleton Pattern
NeuStyle._instance = new NeuStyle();
