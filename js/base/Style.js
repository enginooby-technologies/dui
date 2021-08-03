import { DynamicUI } from '../DynamicUI.js';
export class Style {
    constructor(name, preferredOuterBg = 'none-bg', preferredInnerBg = 'none-bg', preferredFontFamily) {
        this.insertEmptyRule = (selectors) => DynamicUI.cssRules[DynamicUI.styleSheet.insertRule(`${this.formatSelectorsArray(selectors)} {}`)];
        this.name = name;
        this.preferredOuterBg = preferredOuterBg;
        this.preferredInnerBg = preferredInnerBg;
        this.preferredFontFamily = preferredFontFamily;
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
