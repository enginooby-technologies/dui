import * as DynamicTheme from '../DynamicTheme.js';
import { Style } from '../base/Style.js';
import { TinyColor } from '../base/TinyColor.js';
// CAUTION: FlatStyle dependent
//TODO: DRY with FlatStyle
import * as GlassSelectors from '../selectors/GlassSelectors.js';
import * as FlatSelectors from '../selectors/FlatSelectors.js';
import { StyleName } from '../Config.js';
export class GlassStyle extends Style {
    constructor() {
        super(StyleName.Glass);
        this.currentBackground = "background-3";
        this.blur = '2';
        this.transparency = '0.6';
        this.borderSize = '1';
        this.lightenSchemeIntensity = 15;
        this.darkHighlightIntensity = 15;
        this.lightenSchemeColor = new TinyColor('#fafafa');
        this.darkenHighlightColor = new TinyColor('#033669');
        // lazy initializations
        this.getBgSchemeRule = () => { var _a; return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = this.insertEmptyRule(GlassSelectors.bgSchemeSelectors)); };
        this.getBgLightenSchemeRule = () => { var _a; return (_a = this.bgLightenSchemeRule) !== null && _a !== void 0 ? _a : (this.bgLightenSchemeRule = this.insertEmptyRule(FlatSelectors.bgLightenSchemeSelectors)); };
        this.getBgHighlightRule = () => { var _a; return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = this.insertEmptyRule(FlatSelectors.bgHighlightSelectors)); };
        this.getBgDarkenHighlightRule = () => { var _a; return (_a = this.bgDarkenHighlightRule) !== null && _a !== void 0 ? _a : (this.bgDarkenHighlightRule = this.insertEmptyRule(FlatSelectors.bgDarkenHighlightSelectors)); };
        this.getColorHighlightRule = () => { var _a; return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = this.insertEmptyRule(FlatSelectors.colorHighlightSelectors)); };
        this.getColorContrastHighlightRule = () => { var _a; return (_a = this.colorContrastHighlightRule) !== null && _a !== void 0 ? _a : (this.colorContrastHighlightRule = this.insertEmptyRule(FlatSelectors.colorContrastHighlightSelectors)); };
        this.getColorBaseRule = () => { var _a; return (_a = this.colorBaseRule) !== null && _a !== void 0 ? _a : (this.colorBaseRule = this.insertEmptyRule(FlatSelectors.colorBaseSelectors)); };
        this.getColorMutedBaseRule = () => { var _a; return (_a = this.colorMutedBaseRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseRule = this.insertEmptyRule(FlatSelectors.colorMutedBaseSelectors)); };
        this.getBgColorfull1Rule = () => { var _a; return (_a = this.bgColorfull1Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull1Rule = this.insertEmptyRule(['.background-colorfull1:not(.fill-skillbar)'])); };
        this.getBgColorfull2Rule = () => { var _a; return (_a = this.bgColorfull2Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull2Rule = this.insertEmptyRule(['.background-colorfull2:not(.fill-skillbar)'])); };
        this.getBgColorfull3Rule = () => { var _a; return (_a = this.bgColorfull3Rule) !== null && _a !== void 0 ? _a : (this.bgColorfull3Rule = this.insertEmptyRule(['.background-colorfull3:not(.fill-skillbar)'])); };
    }
    static get Instance() {
        var _a;
        (_a = GlassStyle._instance) !== null && _a !== void 0 ? _a : (GlassStyle._instance = new GlassStyle());
        return GlassStyle._instance;
    }
    init() {
        this.initRangeSliders();
        $('section, #personal-website-portfolio .image-border, body').each((index, element) => {
            element.classList.add(this.currentBackground);
            console.log(this.currentBackground);
        });
    }
    onDisable() { }
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
                    this.updateTransparency();
                    break;
                case 'glass-blur':
                    this.blur = newValue;
                    this.updateBlur();
                    break;
                case 'glass-border-size':
                    this.borderSize = newValue;
                    this.updateBorderSize();
                    break;
            }
        });
        $('.background-item').on('click', (event) => {
            const lastBackground = this.currentBackground;
            this.currentBackground = event.currentTarget.id;
            $('section, #personal-website-portfolio .image-border, body').each((index, element) => {
                element.classList.remove(lastBackground);
                element.classList.add(this.currentBackground);
            });
        });
    }
    updateBlur() {
        this.setToCurrentBlur([
            this.getBgSchemeRule(),
            this.getBgLightenSchemeRule(),
            this.getBgHighlightRule(),
            this.getBgDarkenHighlightRule(),
            this.getBgColorfull1Rule(),
            this.getBgColorfull2Rule(),
            this.getBgColorfull3Rule()
        ]);
    }
    setToCurrentBlur(rules) {
        rules.forEach(rule => {
            rule.style.setProperty('backdrop-filter', `blur(${this.blur}px)`, 'important');
            rule.style.setProperty('-webkit-backdrop-filter', `blur(${this.blur}px)`, 'important');
        });
    }
    updateBorderSize() {
        this.setToCurrentBorderSize([
            this.getBgSchemeRule(),
            this.getBgLightenSchemeRule(),
            this.getBgHighlightRule(),
            this.getBgDarkenHighlightRule(),
            this.getBgColorfull1Rule(),
            this.getBgColorfull2Rule(),
            this.getBgColorfull3Rule(),
        ]);
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
    updateTransparency() {
        this.updateTransparencySchemeColor();
        this.updateTransparencyHighlightColor();
        this.updateTransparencyColorfull();
    }
    setToCurrentTransparency(rule, color) {
        const formattedColor = `rgba(${color.rValue}, ${color.gValue}, ${color.bValue}, ${this.transparency})`;
        const contrastColor = color.getInvertBlackWhite();
        rule.style.setProperty('background-color', formattedColor, 'important');
        rule.style.setProperty('color', contrastColor, 'important');
    }
    updateTransparencySchemeColor() {
        this.setToCurrentTransparency(this.getBgSchemeRule(), DynamicTheme.schemeColor);
        this.setToCurrentTransparency(this.getBgLightenSchemeRule(), this.lightenSchemeColor);
    }
    updateTransparencyHighlightColor() {
        this.setToCurrentTransparency(this.getBgHighlightRule(), DynamicTheme.highlightColor);
        this.setToCurrentTransparency(this.getBgDarkenHighlightRule(), DynamicTheme.highlightColor);
    }
    updateTransparencyColorfull() {
        //CONSIDER: Separate update functions if optimization needed
        this.setToCurrentTransparency(this.getBgColorfull1Rule(), DynamicTheme.colorfull1);
        this.setToCurrentTransparency(this.getBgColorfull2Rule(), DynamicTheme.colorfull2);
        this.setToCurrentTransparency(this.getBgColorfull3Rule(), DynamicTheme.colorfull3);
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor.setHex(DynamicTheme.highlightColor.getLighten(this.darkHighlightIntensity));
        this.updateTransparencyHighlightColor();
        this.getColorHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
        this.getColorContrastHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
    }
    onSchemeColorUpdated() {
        this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(this.lightenSchemeIntensity));
        this.updateTransparencySchemeColor();
    }
    onBaseColorUpdated() {
        this.getColorBaseRule().style.setProperty('color', DynamicTheme.baseColor, 'important');
        this.getColorMutedBaseRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
    }
}
