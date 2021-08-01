import * as NeuSelectors from '../selectors/NeuSelectors.js';
import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicUI } from '../DynamicUI.js';
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
        super(StyleName.Neu);
        this.distanceX = 3;
        this.distanceY = 3;
        this.blur = 4;
        this.spread = 0;
        this.lightenIntensity = 6.9;
        this.darkenIntensity = 6.9;
        this.lightenSchemeColor = "#e6e6e6";
        this.darkenSchemeColor = "#c2c2c2";
        this.dropBoxShadow = '';
        this.insetBoxShadow = '';
        this.pressedBoxShadow = '';
        this.thumbScrollbarBoxShadow = '';
        this.borderWidth = 0;
        this.borderBrightness = -6.9;
        // TODO: implement border style
        this.borderStyle = BorderStyle.solid;
        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        this.surfaceCurvature = 0;
        this.bgSurface = '';
        // lazy initializations
        this.getBackgroundSchemeColorRule = () => { var _a; return (_a = this.backgroundSchemeColorRule) !== null && _a !== void 0 ? _a : (this.backgroundSchemeColorRule = this.insertEmptyRule(NeuSelectors.backgroundSchemeColorSelectors)); };
        this.getColorHighlightColorRule = () => { var _a; return (_a = this.colorHighlightColorRule) !== null && _a !== void 0 ? _a : (this.colorHighlightColorRule = this.insertEmptyRule(NeuSelectors.colorHighlightColorSelectors)); };
        this.getColorMutedBaseColorRule = () => { var _a; return (_a = this.colorMutedBaseColorRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseColorRule = this.insertEmptyRule(NeuSelectors.colorMutedBaseColorSelectors)); };
        this.getDropBoxShadowRule = () => { var _a; return (_a = this.dropBoxShadowRule) !== null && _a !== void 0 ? _a : (this.dropBoxShadowRule = this.insertEmptyRule(NeuSelectors.dropBoxShadowSelectors)); };
        this.getInsetBoxShadowRule = () => { var _a; return (_a = this.insetBoxShadowRule) !== null && _a !== void 0 ? _a : (this.insetBoxShadowRule = this.insertEmptyRule(NeuSelectors.insetBoxShadowSelectors)); };
        this.getConcaveBoxShadowRule = () => { var _a; return (_a = this.concaveBoxShadowRule) !== null && _a !== void 0 ? _a : (this.concaveBoxShadowRule = this.insertEmptyRule(NeuSelectors.concaveBoxShadowSelectors)); };
        this.getThumbScrollbarBoxShadowRule = () => { var _a; return (_a = this.thumbScrollbarBoxShadowRule) !== null && _a !== void 0 ? _a : (this.thumbScrollbarBoxShadowRule = this.insertEmptyRule(['::-webkit-scrollbar-thumb'])); };
        this.getBorderRule = () => { var _a; return (_a = this.borderRule) !== null && _a !== void 0 ? _a : (this.borderRule = this.insertEmptyRule(NeuSelectors.borderSelectors)); };
        this.getSurfaceRule = () => { var _a; return (_a = this.surfaceRule) !== null && _a !== void 0 ? _a : (this.surfaceRule = this.insertEmptyRule(NeuSelectors.surfaceSelectors)); };
        this.getRadioIndicatorUncheckedRule = () => { var _a; return (_a = this.radioIndicatorUncheckedRule) !== null && _a !== void 0 ? _a : (this.radioIndicatorUncheckedRule = this.insertEmptyRule(['.dui-radio .indicator::before'])); };
        this.getRadioIndicatorCheckedRule = () => { var _a; return (_a = this.radioIndicatorCheckedRule) !== null && _a !== void 0 ? _a : (this.radioIndicatorCheckedRule = this.insertEmptyRule(['.dui-radio .indicator::after'])); };
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
                    break;
                case 'neu-distance-y':
                    this.distanceY = parseInt(newValue);
                    break;
                case 'blur':
                    this.blur = parseInt(newValue);
                    break;
                case 'neu-spread':
                    this.spread = parseInt(newValue);
                    break;
                case 'light-intensity':
                    this.lightenIntensity = parseInt(newValue);
                    break;
                case 'dark-intensity':
                    this.darkenIntensity = parseInt(newValue);
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
            this.updateBoxShadows();
        });
        $('#neu-customizer #neu-border-style-options input').on('input', event => {
            this.borderStyle = parseInt(event.currentTarget.getAttribute('value'));
            this.updateBorder();
        });
    }
    onHighlightColorUpdated() {
        this.getColorHighlightColorRule().style.setProperty('color', DynamicUI.highlightColor.hex, 'important');
    }
    onSchemeColorUpdated() {
        this.getBackgroundSchemeColorRule().style.setProperty('background', DynamicUI.schemeColor.hex, 'important');
        this.updateBoxShadows();
        this.updateSurface();
        this.updateBorder();
        this.updateRadio();
    }
    onBaseColorUpdated() {
        this.getColorMutedBaseColorRule().style.setProperty('color', DynamicUI.mutedBaseColor, 'important');
        $('.dui-radio label .text').each((index, element) => {
            element.style.borderColor = DynamicUI.mutedBaseColor;
        });
    }
    updateBoxShadows() {
        this.lightenSchemeColor = DynamicUI.schemeColor.getLighten(this.lightenIntensity);
        this.darkenSchemeColor = DynamicUI.schemeColor.getDarken(this.darkenIntensity);
        this.dropBoxShadow = `${this.distanceX}px ${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.lightenSchemeColor}`;
        this.insetBoxShadow = `inset ${this.distanceX}px ${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, inset -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.lightenSchemeColor}`;
        this.pressedBoxShadow = `${this.dropBoxShadow}, ${this.insetBoxShadow}`; // TODO: Does not look good!
        this.thumbScrollbarBoxShadow = `inset -${this.distanceX}px -${this.distanceY}px ${this.blur}px ${this.spread}px ${this.darkenSchemeColor}, inset ${this.distanceX}px ${this.distanceY}px ${this.blur}px${this.spread}px  ${this.lightenSchemeColor}`;
        this.getDropBoxShadowRule().style.setProperty('box-shadow', this.dropBoxShadow, 'important');
        this.getInsetBoxShadowRule().style.setProperty('box-shadow', this.insetBoxShadow, 'important');
        this.getConcaveBoxShadowRule().style.setProperty('box-shadow', this.pressedBoxShadow, 'important');
        this.getThumbScrollbarBoxShadowRule().style.setProperty('box-shadow', this.thumbScrollbarBoxShadow, 'important');
    }
    updateSurface() {
        const leftSurfaceColor = DynamicUI.schemeColor.getLighten(this.surfaceCurvature);
        const rightSurfaceColor = DynamicUI.schemeColor.getDarken(this.surfaceCurvature);
        this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`;
        this.getSurfaceRule().style.setProperty('background', this.bgSurface, 'important');
    }
    updateBorder() {
        const borderColor = DynamicUI.schemeColor.getLighten(this.borderBrightness);
        const borderStyle = `${this.borderWidth}px ${BorderStyle[this.borderStyle]} ${borderColor}`;
        this.getBorderRule().style.setProperty('border', borderStyle);
    }
    updateRadio() {
        //TODO: Variablize
        const checkBoxShadow = `-4px -2px 4px 0px ${this.lightenSchemeColor}, 4px 2px 8px 0px ${this.darkenSchemeColor}`;
        const uncheckBoxShadow = `-4px -2px 4px 0px ${this.darkenSchemeColor}, 4px 2px 8px 0px ${this.lightenSchemeColor}`;
        this.getRadioIndicatorCheckedRule().style.setProperty('box-shadow', checkBoxShadow, 'important');
        this.getRadioIndicatorUncheckedRule().style.setProperty('box-shadow', uncheckBoxShadow, 'important');
    }
}
//  Singleton Pattern
NeuStyle._instance = new NeuStyle();
