import { Style } from '../base/Style.js';
import { TinyColor } from '../base/TinyColor.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { NesConfig } from '../StyleConfig.js';
export class NesStyle extends Style {
    constructor() {
        super(NesConfig);
        // param: border style
        // border-image - repeat: space;
        // border - image - repeat: stretch;
        //param: border width
        this.darkHighlightIntensity = 15;
        this.darkenHighlightColor = "#033669";
        this.borderInput = "";
    }
    static get Instance() {
        var _a;
        (_a = NesStyle._instance) !== null && _a !== void 0 ? _a : (NesStyle._instance = new NesStyle());
        return NesStyle._instance;
    }
    // getBorderInputRule = () => this.borderInputRule ?? (this.borderInputRule = insertEmptyRule(NesSelectors.borderInputSelectors));
    setupCustomizeEvents() {
    }
    init() {
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        // this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
    }
    onBaseColorUpdated() {
        this.updateBorderColor();
        // this.getBorderInputRule().style.setProperty('border-image-source', this.borderInput);
    }
    updateBorderColor() {
        const borderRgb = (DynamicColor.schemeColor == new TinyColor('#ffffff')) ? "rgb(255,255,255)" : "rgb(0,0,0)";
        this.borderInput = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="${borderRgb}" /></svg>')`;
    }
}
NesStyle._instance = new NesStyle();
