import { Style } from '../base/Style.js';
import * as Win98Seletors from '../selectors/Win98Seletors.js';
import { DynamicColor } from '../DynamicColor.js';
import { Win98Config } from '../StyleConfig.js';
export class Win98Style extends Style {
    constructor() {
        super(Win98Config);
        this.getBgSchemeRule = () => { var _a; return (_a = this.bgSchemeRule) !== null && _a !== void 0 ? _a : (this.bgSchemeRule = this.insertEmptyRule(Win98Seletors.bgSchemeSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = Win98Style._instance) !== null && _a !== void 0 ? _a : (Win98Style._instance = new Win98Style());
        return Win98Style._instance;
    }
    setupCustomizeEvents() {
    }
    init() {
    }
    onDisable() {
    }
    onHighlightColorUpdated() {
    }
    onSchemeColorUpdated() {
        this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor.hex);
    }
    onBaseColorUpdated() {
    }
}
Win98Style._instance = new Win98Style();
