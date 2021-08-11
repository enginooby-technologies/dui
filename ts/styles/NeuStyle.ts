import * as NeuSelectors from '../selectors/NeuSelectors.js'
import { Style } from '../base/Style.js';
import { DynamicColor } from '../dynamic/DynamicColor.js';
import { NeuConfig } from '../StyleConfig.js';

enum BorderStyle { solid, double, dotted, dashed }; // order must matchs with id from HTML radio

// REFACTOR: generic singleton
export class NeuStyle extends Style {
        //  Singleton Pattern
        private static _instance: NeuStyle = new NeuStyle();
        private constructor() { super(NeuConfig) }
        public static get Instance(): NeuStyle {
                NeuStyle._instance ??= new NeuStyle();
                return NeuStyle._instance;
        }

        distanceX: number = 3;
        distanceY: number = 3;
        blur: number = 4;
        spread: number = 0;
        lightenIntensity: number = 6.9;
        darkenIntensity: number = 6.9;
        schemeColorLighten: string = "#e6e6e6";
        schemeColorDarken: string = "#c2c2c2";

        borderWidth: number = 0;
        borderBrightness: number = -6.9;
        // TODO: implement border style
        borderStyle: BorderStyle = BorderStyle.solid;

        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        surfaceCurvature: number = 0;
        bgSurface: string = '';

        init() {
                this.initRangeSliders();
                // TODO: Init radio button
        }

        onDisable(): void { }

        private initRangeSliders() {
                this.initRangeSlider('#neu-distance-x', this.distanceX);
                this.initRangeSlider('#neu-distance-y', this.distanceY);
                this.initRangeSlider('#blur', this.blur);
                this.initRangeSlider('#neu-spread', this.spread);
                this.initRangeSlider('#light-intensity', this.lightenIntensity);
                this.initRangeSlider('#dark-intensity', this.darkenIntensity);
                this.initRangeSlider('#neu-border-width', this.borderWidth);
                this.initRangeSlider('#neu-border-brightness', this.borderBrightness);
                this.initRangeSlider('#surface-curvature', this.surfaceCurvature);
        }

        //HELPER
        initRangeSlider(selector: string, value: number) {
                const $slider = $(selector);
                $slider.attr('value', value);
                $slider.next('.range-slider__value').html(value.toString());
        }

        setupCustomizeEvents(): void {
                $("#neu-customizer ,range-slider input").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'neu-distance-x':
                                        this.distanceX = parseInt(newValue);
                                        this.cssRule.style.setProperty('--distance-x', newValue + 'px')
                                        break;
                                case 'neu-distance-y':
                                        this.distanceY = parseInt(newValue);
                                        this.cssRule.style.setProperty('--distance-y', newValue + 'px')
                                        break;
                                case 'blur':
                                        this.blur = parseInt(newValue);
                                        this.cssRule.style.setProperty('--blur', newValue + 'px')
                                        break;
                                case 'neu-spread':
                                        this.spread = parseInt(newValue);
                                        this.cssRule.style.setProperty('--spread', newValue + 'px')
                                        break;
                                case 'light-intensity':
                                        this.lightenIntensity = parseInt(newValue);
                                        this.updateSchemeLighten();
                                        break;
                                case 'dark-intensity':
                                        this.darkenIntensity = parseInt(newValue);
                                        this.updateSchemeDarken();
                                        break;
                                case 'neu-border-width':
                                        this.borderWidth = parseInt(newValue);
                                        this.updateBorder();
                                        return;
                                case 'neu-border-brightness':
                                        this.borderBrightness = parseInt(newValue);
                                        this.updateBorder();
                                        return;
                                case 'surface-curvature':
                                        this.surfaceCurvature = parseInt(newValue);
                                        this.updateSurface();
                                        return;
                        }
                });

                $('#neu-customizer #neu-border-style-options input').on('input', event => {
                        this.borderStyle = parseInt(event.currentTarget.getAttribute('value')!);
                        this.updateBorder();
                });
        }

        onHighlightColorUpdated(): void {
        }

        onSchemeColorUpdated(): void {
                this.updateSurface();
                this.updateBorder();
                this.updateSchemeLighten();
                this.updateSchemeDarken();
        }

        private updateSchemeLighten() {
                this.schemeColorLighten = DynamicColor.schemeColor!.getLighten(this.lightenIntensity);
                this.cssRule.style.setProperty('--scheme-color-lighten', this.schemeColorLighten);
        }

        private updateSchemeDarken() {
                this.schemeColorDarken = DynamicColor.schemeColor!.getDarken(this.darkenIntensity);
                this.cssRule.style.setProperty('--scheme-color-darken', this.schemeColorDarken);
        }

        onBaseColorUpdated(): void {
        }

        private updateSurface() {
                const leftSurfaceColor = DynamicColor.schemeColor!.getLighten(this.surfaceCurvature);
                const rightSurfaceColor = DynamicColor.schemeColor!.getDarken(this.surfaceCurvature);
                this.bgSurface = `linear-gradient(145deg, ${leftSurfaceColor}, ${rightSurfaceColor})`
        }

        private updateBorder() {
                const borderColor: string = DynamicColor.schemeColor!.getLighten(this.borderBrightness);
                const borderStyle: string = `${this.borderWidth}px ${BorderStyle[this.borderStyle]} ${borderColor}`;
        }
}