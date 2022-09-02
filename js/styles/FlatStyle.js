import { Style } from '../base/Style.js';
import { FlatConfig } from '../StyleConfig.js';
export class FlatStyle extends Style {
    constructor() { super(FlatConfig); }
    static get Instance() {
        var _a;
        (_a = FlatStyle._instance) !== null && _a !== void 0 ? _a : (FlatStyle._instance = new FlatStyle());
        return FlatStyle._instance;
    }
    init() { }
    setupCustomizeEvents() { }
    onHighlightColorUpdated() { }
    onSchemeColorUpdated() { }
}
