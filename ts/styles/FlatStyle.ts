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
        darkHighlightIntensity: number = 15;

        init() { }
        setupCustomizeEvents() { }

        onHighlightColorUpdated(): void {
                const darkenHighlightColor = DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity);
                this.cssRule.style.setProperty('--highlight-color-darken', darkenHighlightColor)
        }

        onSchemeColorUpdated(): void {
                const lightenSchemeColor = DynamicColor.schemeColor!.getLighten(this.lightSchemeIntensity);
                this.cssRule.style.setProperty('--scheme-color-lighten', lightenSchemeColor)
        }
}