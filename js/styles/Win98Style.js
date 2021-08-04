import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
export class Win98Style extends Style {
    constructor() { super(StyleName.Win98, 'windows98-bg', 'none-bg'); }
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
    }
    onBaseColorUpdated() {
    }
}
Win98Style._instance = new Win98Style();
