import *as NesSelectors from '../selectors/NesSelectors.js';
import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';

export class NesStyle extends Style {
        //  Singleton Pattern
        private static _instance: NesStyle = new NesStyle();
        private constructor() { super(StyleName.Nes, 'wintery-sunburst-bg', 'none-bg', 'Press Start 2P') }
        public static get Instance(): NesStyle {
                NesStyle._instance ??= new NesStyle();
                return NesStyle._instance;
        }

        // param: border style
        // border-image - repeat: space;
        // border - image - repeat: stretch;

        //param: border width

        darkHighlightIntensity: number = 15;
        darkenHighlightColor: string = "#033669";
        borderInput: string = "";

        private bgSchemeRule?: CSSStyleRule;
        getBgSchemeRule = () => this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(NesSelectors.bgSchemeSelectors));
        private bgHighlightRule?: CSSStyleRule;
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(NesSelectors.bgHighlightSelectors));
        private bgDarkenHighlightRule?: CSSStyleRule;
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors));
        private colorHighlightRule?: CSSStyleRule;
        getColorHighlightRule = () => this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(NesSelectors.colorHighlightSelectors));
        private borderInputRule?: CSSStyleRule;
        getBorderInputRule = () => this.borderInputRule ?? (this.borderInputRule = this.insertEmptyRule(NesSelectors.borderInputSelectors));

        setupCustomizeEvents(): void {
        }

        init(): void {
        }

        onDisable(): void {
        }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
                this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor!.hex, 'important');
                this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
                this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
                this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');
        }

        onSchemeColorUpdated(): void {
                this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor!.hex, 'important');
        }

        onBaseColorUpdated(): void {
                this.updateBorderColor();
                this.getBorderInputRule().style.setProperty('border-image-source', this.borderInput);
        }

        updateBorderColor() {
                const borderRgb = (DynamicColor.baseColor == '#ffffff') ? "rgb(255,255,255)" : "rgb(0,0,0)";
                this.borderInput = `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="${borderRgb}" /></svg>')`;
        }

}