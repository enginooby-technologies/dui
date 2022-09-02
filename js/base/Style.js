import { insertEmptyRule } from '../global.js';
export class Style {
    constructor(config) {
        var _a, _b, _c;
        this.name = config.name;
        this.outerBg = (_a = config.defaultOuterBackground) !== null && _a !== void 0 ? _a : 'none-bg';
        this.innerBg = (_b = config.defaultInnerBackground) !== null && _b !== void 0 ? _b : 'none-bg';
        this.fontFamily = config.defaultFont;
        this.borderRadius = (_c = config.defaultBorderRadius) !== null && _c !== void 0 ? _c : 9;
        this.cssRule = insertEmptyRule('.' + config.name);
    }
    onEnable() {
        this.init();
        this.setupCustomizeEvents();
    }
    ;
    onDisable() { }
    ;
    onHighlightColorUpdated() { }
    ;
    onSchemeColorUpdated() { }
    ;
    onBaseColorUpdated() { }
    ;
}
