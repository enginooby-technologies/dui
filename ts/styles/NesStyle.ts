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
        darkenHighlightColor: string = "#033669"

        private bgHighlightRule?: CSSStyleRule;
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(NesSelectors.bgHighlightSelectors));
        private bgDarkenHighlightRule?: CSSStyleRule;
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors));
        private colorHighlightRule?: CSSStyleRule;
        getColorHighlightRule = () => this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(NesSelectors.colorHighlightSelectors));

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
        }
        onBaseColorUpdated(): void {
        }

}