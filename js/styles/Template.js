import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
export class Template extends Style {
    // change this
    constructor() { super(StyleName.Nes, 'wintery-sunburst-bg', 'none-bg', 'Press Start 2P'); }
    static get Instance() {
        var _a;
        (_a = Template._instance) !== null && _a !== void 0 ? _a : (Template._instance = new Template());
        return Template._instance;
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
Template._instance = new Template();
