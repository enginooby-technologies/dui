import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { FlatConfig } from '../StyleConfig.js';
export class FlatStyle extends Style {
    constructor() {
        super(FlatConfig);
        this.lightSchemeIntensity = 5;
        this.darkHighlightIntensity = 15;
    }
    static get Instance() {
        var _a;
        (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
        return FlatStyle._instance;
    }
    init() { }
    onDisable() { }
    setupCustomizeEvents() { }
    onBaseColorUpdated() {
    }
    onHighlightColorUpdated() {
        const darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        this.cssRule.style.setProperty('--highlight-color-darken', darkenHighlightColor);
        // this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
    }
    onSchemeColorUpdated() {
        const lightenSchemeColor = DynamicColor.schemeColor.getLighten(this.lightSchemeIntensity);
        this.cssRule.style.setProperty('--scheme-color-lighten', lightenSchemeColor);
        // this.getBgLightenSchemeRule().style.setProperty('color', DynamicColor.schemeColor!.getInvertBlackWhite(), 'important');
    }
}
