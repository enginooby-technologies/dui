import { Style } from '../base/Style.js';
import { TinyColor } from '../base/TinyColor.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { GlassConfig } from '../StyleConfig.js';
export class GlassStyle extends Style {
    constructor() {
        super(GlassConfig);
        this.blur = '10';
        this.transparency = '0.6';
        this.borderSize = '1';
        this.lightenSchemeIntensity = 15;
        this.darkHighlightIntensity = 15;
        this.lightenSchemeColor = new TinyColor('#fafafa');
        this.darkenHighlightColor = new TinyColor('#033669');
    }
    static get Instance() {
        var _a;
        (_a = GlassStyle._instance) !== null && _a !== void 0 ? _a : (GlassStyle._instance = new GlassStyle());
        return GlassStyle._instance;
    }
    init() {
        this.initRangeSliders();
    }
    initRangeSliders() {
        $('#glass-transparency').attr('value', this.transparency);
        $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
        $('#glass-blur').attr('value', this.blur);
        $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
        $('#glass-border-size').attr('value', this.borderSize);
        $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
    }
    setupCustomizeEvents() {
        $("#glass-transparency, #glass-blur, #glass-border-size").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'glass-transparency':
                    this.transparency = newValue;
                    this.cssRule.style.setProperty('--transparency', newValue);
                    break;
                case 'glass-blur':
                    this.blur = newValue;
                    this.cssRule.style.setProperty('--blur', newValue + 'px');
                    break;
                case 'glass-border-size':
                    this.borderSize = newValue;
                    this.cssRule.style.setProperty('--border-size', newValue + 'px');
                    break;
            }
        });
    }
    updateBorderSize() {
        // update limit
        const borderSizeNumber = parseFloat(this.borderSize);
        //TODO: use Map or Dictionary
        this.setPropertyWithLimit('.setting-button-border', 'border-width', borderSizeNumber, 1.5, 'px');
        this.setPropertyWithLimit('.range-slider__range', 'border-width', borderSizeNumber, 1.5, 'px');
        this.setPropertyWithLimit('.range-slider__value', 'border-width', borderSizeNumber, 1.5, 'px');
    }
    setToCurrentBorderSize(rules) {
        //TODO: Variablize border properties
        rules.forEach(rule => rule.style.setProperty('border', `${this.borderSize}px solid rgba(209, 213, 219, 0.3)`, 'important'));
    }
    //HELPER
    setPropertyWithLimit(selector, property, rawValue, limitValue, unit) {
        document.querySelectorAll(selector).forEach((element) => {
            const processedValue = Math.min(limitValue, rawValue);
            element.style.setProperty(property, `${processedValue}${unit}`, 'important');
        });
    }
    updateColorCssVar(cssVar, color) {
        this.cssRule.style.setProperty(cssVar, `${color.rValue}, ${color.gValue}, ${color.bValue}`);
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor.setHex(DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity));
        this.updateColorCssVar('--highlight-color-darken', this.darkenHighlightColor);
    }
    onSchemeColorUpdated() {
        this.lightenSchemeColor.setHex(DynamicColor.schemeColor.getLighten(this.lightenSchemeIntensity));
        this.updateColorCssVar('--scheme-color-lighten', this.lightenSchemeColor);
    }
}
