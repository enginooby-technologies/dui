import { insertEmptyRule } from '../global.js';
export class Style {
    constructor(styleConfig) {
        var _a, _b;
        this.name = styleConfig.name;
        this.preferredOuterBg = (_a = styleConfig.outerBackground) !== null && _a !== void 0 ? _a : 'none-bg';
        this.preferredInnerBg = (_b = styleConfig.innerBackground) !== null && _b !== void 0 ? _b : 'none-bg';
        this.preferredFontFamily = styleConfig.font;
        this.cssRule = insertEmptyRule('.' + styleConfig.name);
    }
    // protected insertEmptyRule = (selectors: string[]): CSSStyleRule => cssRules![styleSheet!.insertRule(`${this.formatSelectorsArray(selectors)} {}`)] as CSSStyleRule;
    formatSelectorsArray(array) {
        return array.map(selector => `.${this.name} ${selector}`).join(", ");
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
    }
    ;
}
