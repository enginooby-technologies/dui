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

        distanceX?: number
        distanceY?: number
        blur?: number
        spread?: number
        lightenIntensity?: number
        darkenIntensity?: number
        borderWidth?: number
        borderBrightness?: number
        borderStyle: BorderStyle = BorderStyle.solid
        //TODO: implement curvature for colorful background
        // negative: concave - 0: flat - positive: convex
        surfaceCurvature?: number
        bgSurface: string = ''

        init() {
                this.distanceX = + getComputedStyle(document.body).getPropertyValue("--neu-distance-x").replace('px', '')
                this.distanceY = + getComputedStyle(document.body).getPropertyValue("--neu-distance-y").replace('px', '')
                this.blur = + getComputedStyle(document.body).getPropertyValue("--neu-blur").replace('px', '')
                this.spread = + getComputedStyle(document.body).getPropertyValue("--neu-spread").replace('px', '')
                this.lightenIntensity = + getComputedStyle(document.body).getPropertyValue("--neu-lighten-intensity").replace('%', '')
                this.darkenIntensity = + getComputedStyle(document.body).getPropertyValue("--neu-darken-intensity").replace('%', '')
                this.borderWidth = + getComputedStyle(document.body).getPropertyValue("--neu-border-width").replace('px', '')
                this.borderBrightness = + getComputedStyle(document.body).getPropertyValue("--neu-border-brightness").replace('%', '')
                this.surfaceCurvature = + getComputedStyle(document.body).getPropertyValue("--neu-surface-curvature").replace('%', '')
                this.setSliderValue('#neu-distance-x', this.distanceX);
                this.setSliderValue('#neu-distance-y', this.distanceY);
                this.setSliderValue('#blur', this.blur);
                this.setSliderValue('#neu-spread', this.spread);
                this.setSliderValue('#light-intensity', this.lightenIntensity);
                this.setSliderValue('#dark-intensity', this.darkenIntensity);
                // TODO: init border style
                this.setSliderValue('#neu-border-width', this.borderWidth);
                this.setSliderValue('#neu-border-brightness', this.borderBrightness);
                this.setSliderValue('#surface-curvature', this.surfaceCurvature);
        }

        //UTIL
        setSliderValue(selector: string, value: number) {
                const $slider = $(selector);
                $slider.attr('value', value);
                $slider.next('.range-slider__value').html(value.toString());
        }

        setupCustomizeEvents(): void {
                $("#neu-customizer ,range-slider input").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        // REFACTOR
                        switch (event.target.id) {
                                case 'neu-distance-x':
                                        this.distanceX = +newValue
                                        this.cssRule.style.setProperty('--neu-distance-x', newValue + 'px')
                                        break;
                                case 'neu-distance-y':
                                        this.distanceY = +newValue
                                        this.cssRule.style.setProperty('--neu-distance-y', newValue + 'px')
                                        break;
                                case 'blur':
                                        this.blur = +newValue
                                        this.cssRule.style.setProperty('--neu-blur', newValue + 'px')
                                        break;
                                case 'neu-spread':
                                        this.spread = +newValue
                                        this.cssRule.style.setProperty('--neu-spread', newValue + 'px')
                                        break;
                                case 'light-intensity':
                                        this.lightenIntensity = +newValue
                                        this.cssRule.style.setProperty('--neu-lighten-intensity', newValue + '%')
                                        break;
                                case 'dark-intensity':
                                        this.darkenIntensity = +newValue
                                        this.cssRule.style.setProperty('--neu-darken-intensity', newValue + '%')
                                        break;
                                case 'neu-border-width':
                                        this.borderWidth = +newValue
                                        this.cssRule.style.setProperty('--neu-border-width', newValue + 'px')
                                        return;
                                case 'neu-border-brightness':
                                        this.borderBrightness = +newValue
                                        this.cssRule.style.setProperty('--neu-border-brightness', newValue + '%')
                                        return;
                                case 'surface-curvature':
                                        this.surfaceCurvature = +newValue
                                        this.cssRule.style.setProperty('--neu-surface-curvature', newValue + '%')
                                        return;
                        }
                });

                $(' .neu-border-style-options input').on('input', event => {
                        this.borderStyle = +event.currentTarget.getAttribute('value')!
                        this.cssRule.style.setProperty('--neu-border-style', BorderStyle[this.borderStyle])
                });
        }
}