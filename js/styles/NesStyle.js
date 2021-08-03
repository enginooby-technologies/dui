import * as NesSelectors from '../selectors/NesSelectors.js';
import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';
export class NesStyle extends Style {
    constructor() {
        super(StyleName.Nes, 'wintery-sunburst-bg', 'none-bg', 'Press Start 2P');
        // param: border style
        // border-image - repeat: space;
        // border - image - repeat: stretch;
        this.darkHighlightIntensity = 15;
        this.darkenHighlightColor = "#033669";
        this.getBgHighlightRule = () => { var _a; return (_a = this.bgHighlightRule) !== null && _a !== void 0 ? _a : (this.bgHighlightRule = this.insertEmptyRule(NesSelectors.bgHighlightSelectors)); };
        this.getBgDarkenHighlightRule = () => { var _a; return (_a = this.bgDarkenHighlightRule) !== null && _a !== void 0 ? _a : (this.bgDarkenHighlightRule = this.insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors)); };
        this.getColorHighlightRule = () => { var _a; return (_a = this.colorHighlightRule) !== null && _a !== void 0 ? _a : (this.colorHighlightRule = this.insertEmptyRule(NesSelectors.colorHighlightSelectors)); };
    }
    static get Instance() {
        var _a;
        (_a = NesStyle._instance) !== null && _a !== void 0 ? _a : (NesStyle._instance = new NesStyle());
        return NesStyle._instance;
    }
    setupCustomizeEvents() {
    }
    init() {
    }
    onDisable() {
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor.hex, 'important');
        this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
        this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
        this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');
    }
    onSchemeColorUpdated() {
    }
    onBaseColorUpdated() {
    }
}
//  Singleton Pattern
NesStyle._instance = new NesStyle();
