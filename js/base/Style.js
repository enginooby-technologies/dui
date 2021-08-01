import { DynamicUI } from '../DynamicUI.js';
export class Style {
    constructor(name, preferredOuterBg, preferredInnerBg) {
        this.insertEmptyRule = (selectors) => DynamicUI.cssRules[DynamicUI.styleSheet.insertRule(`${this.formatSelectorsArray(selectors)} {}`)];
        this.name = name;
        this.preferredOuterBg = preferredOuterBg !== null && preferredOuterBg !== void 0 ? preferredOuterBg : 'none-bg';
        this.preferredInnerBg = preferredInnerBg !== null && preferredInnerBg !== void 0 ? preferredInnerBg : 'none-bg';
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
