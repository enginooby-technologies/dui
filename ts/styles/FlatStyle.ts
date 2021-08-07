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

        private bgLightenSchemeRule?: CSSStyleRule;
        private bgDarkenHighlightRule?: CSSStyleRule;
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(FlatSelectors.bgDarkenHighlightSelectors));
        private colorBaseRule?: CSSStyleRule;
        private colorMutedBaseRule?: CSSStyleRule;

        // lazy initializations
        getBgLightenSchemeRule = () => this.bgLightenSchemeRule ?? (this.bgLightenSchemeRule = this.insertEmptyRule(FlatSelectors.bgLightenSchemeSelectors));
        getColorBaseRule = () => this.colorBaseRule ?? (this.colorBaseRule = this.insertEmptyRule(FlatSelectors.colorBaseSelectors));
        getColorMutedBaseRule = () => this.colorMutedBaseRule ?? (this.colorMutedBaseRule = this.insertEmptyRule(FlatSelectors.colorMutedBaseSelectors));

        init() { }
        onDisable(): void { }

        setupCustomizeEvents(): void { }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
                this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
                this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor = DynamicColor.schemeColor!.getLighten(this.lightSchemeIntensity);
                this.getBgLightenSchemeRule().style.setProperty('background-color', this.lightenSchemeColor, 'important');
                this.getBgLightenSchemeRule().style.setProperty('color', DynamicColor.schemeColor!.getInvertBlackWhite(), 'important');
        }

        public onBaseColorUpdated(): void {
                this.getColorBaseRule().style.setProperty('color', DynamicColor.baseColor!, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicColor.mutedBaseColor!, 'important');
        }
}