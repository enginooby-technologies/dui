import *as NesSelectors from '../selectors/NesSelectors.js';
import { Style } from '../base/Style.js';
import { StyleName } from '../Config.js';
import { DynamicColor } from '../DynamicColor.js';

export class NesStyle extends Style {
        //  Singleton Pattern
        private static _instance: NesStyle = new NesStyle();
        private constructor() { super(StyleName.Nes) }
        public static get Instance(): NesStyle {
                NesStyle._instance ??= new NesStyle();
                return NesStyle._instance;
        }

        darkHighlightIntensity: number = 15;
        darkenHighlightColor: string = "#033669"

        private bgHighlightRule?: CSSStyleRule;
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(NesSelectors.bgHighlightSelectors));
        private bgDarkenHighlightRule?: CSSStyleRule;
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(NesSelectors.bgDarkenHighlightSelectors));

        setupCustomizeEvents(): void {
        }

        init(): void {
                $('.button, .setting-button').each((index, element) => {
                        $(element).addClass('nes-btn');
                });

                $(' input[type=checkbox]').each((index, element) => {
                        // $(element).addClass('nes-checkbox ');
                });

                $('.box-border, .image-border, .setting-panel').each((index, element) => {
                        $(element).addClass('nes-container').addClass('is-rounded');
                });

                $('.badge').each((index, element) => {
                        // $(element).addClass('nes-badge');
                });
        }

        onDisable(): void {
                $('.button,.setting-button').each((index, element) => {
                        $(element).removeClass('nes-btn');
                });
                $('.box-border, .image-border, .setting-panel').each((index, element) => {
                        $(element).removeClass('nes-container').removeClass('is-rounded');
                });
        }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
                this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor!.hex, 'important');
                this.getBgHighlightRule().style.setProperty('color', DynamicColor.highlightColor!.getInvertBlackWhite(), 'important');
                this.getBgDarkenHighlightRule().style.setProperty('background-color', this.darkenHighlightColor, 'important');
                // this.getBgDarkenHighlightRule().style.setProperty('color', DynamicColor.highlightColor.getInvertBlackWhite(), 'important');
        }
        onSchemeColorUpdated(): void {
        }
        onBaseColorUpdated(): void {
        }

}