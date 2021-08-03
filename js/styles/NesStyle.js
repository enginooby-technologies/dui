import * as NesSelectors from '../selectors/NesSelectors.js';
import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';
export class NesStyle extends Style {
    constructor() {
        super(StyleName.Nes, 'none-bg', 'none-bg', 'BioRhyme');
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
        // $('.button, .setting-button').each((index, element) => {
        //         $(element).addClass('nes-btn');
        // });
        // $(' input[type=checkbox]').each((index, element) => {
        //         // $(element).addClass('nes-checkbox ');
        // });
        // $('.box-border, .image-border, .setting-panel').each((index, element) => {
        //         $(element).addClass('nes-container').addClass('is-rounded');
        // });
        // $('.badge').each((index, element) => {
        //         // $(element).addClass('nes-badge');
        // });
    }
    onDisable() {
        // $('.button,.setting-button').each((index, element) => {
        //         $(element).removeClass('nes-btn');
        // });
        // $('.box-border, .image-border, .setting-panel').each((index, element) => {
        //         $(element).removeClass('nes-container').removeClass('is-rounded');
        // });
    }
    onHighlightColorUpdated() {
        this.darkenHighlightColor = DynamicColor.highlightColor.getDarken(this.darkHighlightIntensity);
        this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor.hex, 'important');
        this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
        this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
        // this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
        this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');
    }
    onSchemeColorUpdated() {
    }
    onBaseColorUpdated() {
    }
}
//  Singleton Pattern
NesStyle._instance = new NesStyle();
