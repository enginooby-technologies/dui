import * as FlatSelectors from '../selectors/FlatSelectors.js'
import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { FlatConfig } from '../StyleConfig.js';

export class FlatStyle extends Style {
        // Singleton Pattern
        private static _instance: FlatStyle;
        private constructor() { super(FlatConfig) }
        public static get Instance(): FlatStyle {
                FlatStyle._instance ??= new FlatStyle();
                return FlatStyle._instance;
        }

        lightSchemeIntensity: number = 5;
        lightenSchemeColor: string = "#e1e1e1";
        darkHighlightIntensity: number = 15;
        darkenHighlightColor: string = "#033669"

        private bgSchemeRule?: CSSStyleRule;
        getBgSchemeRule = () => this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(FlatSelectors.bgSchemeSelectors));
        private bgLightenSchemeRule?: CSSStyleRule;
        private bgHighlightRule?: CSSStyleRule;
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(FlatSelectors.bgHighlightSelectors));
        private bgDarkenHighlightRule?: CSSStyleRule;
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(FlatSelectors.bgDarkenHighlightSelectors));
        private colorHighlightRule?: CSSStyleRule;
        private colorContrastHighlightRule?: CSSStyleRule;
        private colorBaseRule?: CSSStyleRule;
        private colorMutedBaseRule?: CSSStyleRule;

        // lazy initializations
        getBgLightenSchemeRule = () => this.bgLightenSchemeRule ?? (this.bgLightenSchemeRule = this.insertEmptyRule(FlatSelectors.bgLightenSchemeSelectors));
        getColorHighlightRule = () => this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(FlatSelectors.colorHighlightSelectors));
        getColorContrastHighlightRule = () => this.colorContrastHighlightRule ?? (this.colorContrastHighlightRule = this.insertEmptyRule(FlatSelectors.colorContrastHighlightSelectors));
        getColorBaseRule = () => this.colorBaseRule ?? (this.colorBaseRule = this.insertEmptyRule(FlatSelectors.colorBaseSelectors));
        getColorMutedBaseRule = () => this.colorMutedBaseRule ?? (this.colorMutedBaseRule = this.insertEmptyRule(FlatSelectors.colorMutedBaseSelectors));

        init() { }
        onDisable(): void { }

        setupCustomizeEvents(): void { }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
                this.updateBgHighlight();
                this.updateColorHighlight();
        }

        private updateBgHighlight() {
                this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor!.hex, 'important');
                this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
                this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
                this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
        }

        public updateColorHighlight() {
                this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.hex, 'important');
                this.getColorContrastHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor = DynamicColor.schemeColor!.getLighten(this.lightSchemeIntensity);
                this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor!.hex);
                this.getBgSchemeRule().style.setProperty('color', DynamicColor.schemeColor!.getInvertBlackWhite(), 'important');
                this.getBgLightenSchemeRule().style.setProperty('background-color', this.lightenSchemeColor, 'important');
                this.getBgLightenSchemeRule().style.setProperty('color', DynamicColor.schemeColor!.getInvertBlackWhite(), 'important');
        }

        public onBaseColorUpdated(): void {
                this.getColorBaseRule().style.setProperty('color', DynamicColor.baseColor!, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicColor.mutedBaseColor!, 'important');
        }
}