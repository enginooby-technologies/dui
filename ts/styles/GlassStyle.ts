import { Color } from '../base/Color.js';
import * as DynamicTheme from '../DynamicTheme.js';
import { Style } from '../base/Style.js';
import { TinyColor } from '../base/TinyColor.js';

// CAUTION: FlatStyle dependent
//TODO: DRY with FlatStyle
import * as GlassSelectors from '../selectors/GlassSelectors.js'
import * as FlatSelectors from '../selectors/FlatSelectors.js'
import { StyleName } from '../Config.js';

export class GlassStyle extends Style {
        // Singleton Pattern
        private static _instance: GlassStyle;
        private constructor() { super(StyleName.Glass) }
        public static get Instance(): GlassStyle {
                GlassStyle._instance ??= new GlassStyle();
                return GlassStyle._instance;
        }

        currentBackground: string = "background-3";
        blur = '2';
        transparency = '0.6';
        borderSize = '1';
        lightenSchemeIntensity = 15;
        darkHighlightIntensity: number = 15;
        lightenSchemeColor: Color = new TinyColor('#fafafa');
        darkenHighlightColor: Color = new TinyColor('#033669');

        private bgColorfull1Rule?: CSSStyleRule;
        private bgColorfull2Rule?: CSSStyleRule;
        private bgColorfull3Rule?: CSSStyleRule;

        private bgSchemeRule?: CSSStyleRule;
        private bgLightenSchemeRule?: CSSStyleRule;
        private bgHighlightRule?: CSSStyleRule;
        private bgDarkenHighlightRule?: CSSStyleRule;
        private colorHighlightRule?: CSSStyleRule;
        private colorContrastHighlightRule?: CSSStyleRule;
        private colorBaseRule?: CSSStyleRule;
        private colorMutedBaseRule?: CSSStyleRule;

        // lazy initializations
        getBgSchemeRule = () => this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(GlassSelectors.bgSchemeSelectors));
        getBgLightenSchemeRule = () => this.bgLightenSchemeRule ?? (this.bgLightenSchemeRule = this.insertEmptyRule(FlatSelectors.bgLightenSchemeSelectors));
        getBgHighlightRule = () => this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(FlatSelectors.bgHighlightSelectors));
        getBgDarkenHighlightRule = () => this.bgDarkenHighlightRule ?? (this.bgDarkenHighlightRule = this.insertEmptyRule(FlatSelectors.bgDarkenHighlightSelectors));
        getColorHighlightRule = () => this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(FlatSelectors.colorHighlightSelectors));
        getColorContrastHighlightRule = () => this.colorContrastHighlightRule ?? (this.colorContrastHighlightRule = this.insertEmptyRule(FlatSelectors.colorContrastHighlightSelectors));
        getColorBaseRule = () => this.colorBaseRule ?? (this.colorBaseRule = this.insertEmptyRule(FlatSelectors.colorBaseSelectors));
        getColorMutedBaseRule = () => this.colorMutedBaseRule ?? (this.colorMutedBaseRule = this.insertEmptyRule(FlatSelectors.colorMutedBaseSelectors));
        getBgColorfull1Rule = () => this.bgColorfull1Rule ?? (this.bgColorfull1Rule = this.insertEmptyRule(['.background-colorfull1:not(.fill-skillbar)']));
        getBgColorfull2Rule = () => this.bgColorfull2Rule ?? (this.bgColorfull2Rule = this.insertEmptyRule(['.background-colorfull2:not(.fill-skillbar)']));
        getBgColorfull3Rule = () => this.bgColorfull3Rule ?? (this.bgColorfull3Rule = this.insertEmptyRule(['.background-colorfull3:not(.fill-skillbar)']));

        init() {
                this.initRangeSliders();
                $('section, #personal-website-portfolio .image-border, body').each((index, element) => {
                        element.classList.add(this.currentBackground);
                        console.log(this.currentBackground);
                });
        }

        onDisable(): void { }

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
                                        this.updateTransparency();
                                        break;
                                case 'glass-blur':
                                        this.blur = newValue;
                                        this.updateBlur();
                                        break;
                                case 'glass-border-size':
                                        this.borderSize = newValue;
                                        this.updateBorderSize();
                                        break;
                        }
                });

                $('.background-item').on('click', (event) => {
                        const lastBackground: string = this.currentBackground;
                        this.currentBackground = event.currentTarget.id;

                        $('section, #personal-website-portfolio .image-border, body').each((index, element) => {
                                element.classList.remove(lastBackground);
                                element.classList.add(this.currentBackground);
                        })
                });
        }

        updateBlur() {
                this.setToCurrentBlur([
                        this.getBgSchemeRule(),
                        this.getBgLightenSchemeRule(),
                        this.getBgHighlightRule(),
                        this.getBgDarkenHighlightRule(),
                        this.getBgColorfull1Rule(),
                        this.getBgColorfull2Rule(),
                        this.getBgColorfull3Rule()
                ]);
        }

        setToCurrentBlur(rules: CSSStyleRule[]) {
                rules.forEach(rule => {
                        rule.style.setProperty('backdrop-filter', `blur(${this.blur}px)`, 'important');
                        rule.style.setProperty('-webkit-backdrop-filter', `blur(${this.blur}px)`, 'important');
                });
        }

        updateBorderSize() {
                this.setToCurrentBorderSize([
                        this.getBgSchemeRule(),
                        this.getBgLightenSchemeRule(),
                        this.getBgHighlightRule(),
                        this.getBgDarkenHighlightRule(),
                        this.getBgColorfull1Rule(),
                        this.getBgColorfull2Rule(),
                        this.getBgColorfull3Rule(),
                ]);

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

        updateTransparency() {
                this.updateTransparencySchemeColor();
                this.updateTransparencyHighlightColor();
                this.updateTransparencyColorfull();
        }

        setToCurrentTransparency(rule: CSSStyleRule, color: Color) {
                const formattedColor: string = `rgba(${color.rValue}, ${color.gValue}, ${color.bValue}, ${this.transparency})`;
                const contrastColor: string = color.getInvertBlackWhite();
                rule.style.setProperty('background-color', formattedColor, 'important');
                rule.style.setProperty('color', contrastColor, 'important');
        }

        private updateTransparencySchemeColor() {
                this.setToCurrentTransparency(this.getBgSchemeRule(), DynamicTheme.schemeColor);
                this.setToCurrentTransparency(this.getBgLightenSchemeRule(), this.lightenSchemeColor);
        }

        private updateTransparencyHighlightColor() {
                this.setToCurrentTransparency(this.getBgHighlightRule(), DynamicTheme.highlightColor);
                this.setToCurrentTransparency(this.getBgDarkenHighlightRule(), DynamicTheme.highlightColor);
        }

        private updateTransparencyColorfull() {
                //CONSIDER: Separate update functions if optimization needed
                this.setToCurrentTransparency(this.getBgColorfull1Rule(), DynamicTheme.colorfull1);
                this.setToCurrentTransparency(this.getBgColorfull2Rule(), DynamicTheme.colorfull2);
                this.setToCurrentTransparency(this.getBgColorfull3Rule(), DynamicTheme.colorfull3);
        }

        onHighlightColorUpdated(): void {
                this.darkenHighlightColor.setHex(DynamicTheme.highlightColor.getLighten(this.darkHighlightIntensity));
                this.updateTransparencyHighlightColor();
                this.getColorHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.hex, 'important');
                this.getColorContrastHighlightRule().style.setProperty('color', DynamicTheme.highlightColor.getInvertBlackWhite(), 'important');
        }

        onSchemeColorUpdated(): void {
                this.lightenSchemeColor.setHex(DynamicTheme.schemeColor.getLighten(this.lightenSchemeIntensity));
                this.updateTransparencySchemeColor();
        }

        onBaseColorUpdated(): void {
                this.getColorBaseRule().style.setProperty('color', DynamicTheme.baseColor, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicTheme.mutedBaseColor, 'important');
        }
}