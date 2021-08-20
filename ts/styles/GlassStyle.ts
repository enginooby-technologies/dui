import { Color } from '../base/Color.js';
import { Style } from '../base/Style.js';
import { TinyColor } from '../base/TinyColor.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { GlassConfig } from '../StyleConfig.js';

export class GlassStyle extends Style {
        // Singleton Pattern
        private static _instance: GlassStyle;
        private constructor() { super(GlassConfig) }
        public static get Instance(): GlassStyle {
                GlassStyle._instance ??= new GlassStyle();
                return GlassStyle._instance;
        }

        blur = '10';
        transparency = '0.6';
        borderSize = '1';
        lightenSchemeIntensity = 15;
        darkHighlightIntensity: number = 15;
        lightenSchemeColor: Color = new TinyColor('#fafafa');
        darkenHighlightColor: Color = new TinyColor('#033669');

        init() {
                this.initRangeSliders();
        }

        initRangeSliders() {
                $('#glass-transparency').attr('value', this.transparency);
                $("#glass-transparency").next('.range-slider__value').html(this.transparency.toString());
                $('#glass-blur').attr('value', this.blur);
                $("#glass-blur").next('.range-slider__value').html(this.blur.toString());
                $('#glass-border-size').attr('value', this.borderSize);
                $("#glass-border-size").next('.range-slider__value').html(this.borderSize.toString());
        }

        setupCustomizeEvents(): void {
                $("#glass-transparency, #glass-blur, #glass-border-size").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'glass-transparency':
                                        this.transparency = newValue;
                                        this.cssRule.style.setProperty('--transparency', newValue)
                                        break;
                                case 'glass-blur':
                                        this.blur = newValue;
                                        this.cssRule.style.setProperty('--blur', newValue + 'px')
                                        break;
                                case 'glass-border-size':
                                        this.borderSize = newValue;
                                        this.cssRule.style.setProperty('--border-size', newValue + 'px')
                                        break;
                        }
                });
        }

        updateBorderSize() {
                // update limit
                const borderSizeNumber = parseFloat(this.borderSize);
                //TODO: use Map or Dictionary
                this.setPropertyWithLimit('.setting-button-border', 'border-width', borderSizeNumber, 1.5, 'px');
                this.setPropertyWithLimit('.range-slider__range', 'border-width', borderSizeNumber, 1.5, 'px');
                this.setPropertyWithLimit('.range-slider__value', 'border-width', borderSizeNumber, 1.5, 'px');
        }

        setToCurrentBorderSize(rules: CSSStyleRule[]) {
                //TODO: Variablize border properties
                rules.forEach(rule => rule.style.setProperty('border', `${this.borderSize}px solid rgba(209, 213, 219, 0.3)`, 'important'));
        }

        //HELPER
        setPropertyWithLimit(selector: string, property: string, rawValue: number, limitValue: number, unit: string) {
                document.querySelectorAll(selector).forEach((element) => {
                        const processedValue = Math.min(limitValue, rawValue);
                        (element as HTMLElement).style.setProperty(property, `${processedValue}${unit}`, 'important');
                });
        }

        private updateColorCssVar(cssVar: string, color: Color) {
                this.cssRule.style.setProperty(cssVar, `${color.rVal}, ${color.gVal}, ${color.bVal}`);
        }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor.setHex(DynamicColor.highlightColor!.getDarken(this.darkHighlightIntensity));
                this.updateColorCssVar('--highlight-color-darken', this.darkenHighlightColor);
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor.setHex(DynamicColor.schemeColor!.getLighten(this.lightenSchemeIntensity));
                this.updateColorCssVar('--scheme-color-lighten', this.lightenSchemeColor);
        }
}