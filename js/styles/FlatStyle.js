import * as FlatSelectors from '../selectors/FlatSelectors.js';
import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { FlatConfig } from '../StyleConfig.js';
export class FlatStyle extends Style {
    constructor() {
        super(FlatConfig);
        this.lightSchemeIntensity = 5;
        this.lightenSchemeColor = "#e1e1e1";
        this.darkHighlightIntensity = 15;
        this.darkenHighlightColor = "#033669";
        this.getBgSchemeRule = () => { var _a; return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = this.insertEmptyRule(FlatSelectors.bgSchemeSelectors)); };
        this.getBgHighlightRule = () => { var _a; return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = this.insertEmptyRule(FlatSelectors.bgHighlightSelectors)); };
        this.getBgDarkenHighlightRule = () => { var _a; return (_a = this.bgDarkenHighlightRule) !== null && _a !== void 0 ? _a : (this.bgDarkenHighlightRule = this.insertEmptyRule(FlatSelectors.bgDarkenHighlightSelectors)); };
        // lazy initializations
        this.getBgLightenSchemeRule = () => { var _a; return (_a = this.bgLightenSchemeRule) !== null && _a !== void 0 ? _a : (this.bgLightenSchemeRule = this.insertEmptyRule(FlatSelectors.bgLightenSchemeSelectors)); };
        this.getColorHighlightRule = () => { var _a; return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = this.insertEmptyRule(FlatSelectors.colorHighlightSelectors)); };
        this.getColorContrastHighlightRule = () => { var _a; return (_a = this.colorContrastHighlightRule) !== null && _a !== void 0 ? _a : (this.colorContrastHighlightRule = this.insertEmptyRule(FlatSelectors.colorContrastHighlightSelectors)); };
        this.getColorBaseRule = () => { var _a; return (_a = this.colorBaseRule) !== null && _a !== void 0 ? _a : (this.colorBaseRule = this.insertEmptyRule(FlatSelectors.colorBaseSelectors)); };
        this.getColorMutedBaseRule = () => { var _a; return (_a = this.colorMutedBaseRule) !== null && _a !== void 0 ? _a : (this.colorMutedBaseRule = this.insertEmptyRule(FlatSelectors.colorMutedBaseSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
        return FlatStyle._instance;
    }
    init() { }
    onDisable() { }
    setupCustomizeEvents() { }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        this.updateBgHighlight();
        this.updateColorHighlight();
    }
    updateBgHighlight() {
        this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor.hex, 'important');
        this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
        this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
        this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
    }
    updateColorHighlight() {
        this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');
        this.getColorContrastHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
    }
    onSchemeColorUpdated() {
        this.lightenSchemeColor = DynamicColor.schemeColor.getLighten(this.lightSchemeIntensity);
        this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor.hex);
        this.getBgSchemeRule().style.setProperty('color', DynamicColor.schemeColor.getInvertBlackWhite(), 'important');
        this.getBgLightenSchemeRule().style.setProperty('background-color', this.lightenSchemeColor, 'important');
        this.getBgLightenSchemeRule().style.setProperty('color', DynamicColor.schemeColor.getInvertBlackWhite(), 'important');
    }
    onBaseColorUpdated() {
        this.getColorBaseRule().style.setProperty('color', DynamicColor.baseColor, 'important');
        this.getColorMutedBaseRule().style.setProperty('color', DynamicColor.mutedBaseColor, 'important');
    }
}
