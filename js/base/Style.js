import { DynamicUI } from '../DynamicUI.js';
export class Style {
    constructor(styleConfig) {
        var _a, _b;
        this.insertEmptyRule = (selectors) => DynamicUI.cssRules[DynamicUI.styleSheet.insertRule(`${this.formatSelectorsArray(selectors)} {}`)];
        this.name = styleConfig.name;
        this.preferredOuterBg = (_a = styleConfig.outerBackground) !== null && _a !== void 0 ? _a : 'none-bg';
        this.preferredInnerBg = (_b = styleConfig.innerBackground) !== null && _b !== void 0 ? _b : 'none-bg';
        this.preferredFontFamily = styleConfig.font;
    }
    formatSelectorsArray(array) {
        return array.map(selector => `.${this.name} ${selector}`).join(", ");
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
    }
    ;
}
