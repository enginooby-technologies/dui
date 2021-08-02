// import WebFont from "webfontloader";
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { DynamicUI } from "./DynamicUI.js";

//Font presets: font family _ scale _ line height _ letter spacing
// Palette Mosdic _ 0.8 _ 1.3 _ -7.5

export class DynamicFont {
        // uniform properties
        letterSpacing: number = 1;
        lineHeight: number = 1.45;

        // separate properties
        //font-weight
        // font-size

        //uniform or separate properties
        family?: string;
        sizeScale: number = 1; //alternative: font-size

        $dropdownLabelFontFamily: JQuery<HTMLElement>;
        fontRule?: CSSStyleRule;
        getFontRule = () => this.fontRule ?? (this.fontRule = DynamicUI.insertEmptyRule(DynamicSelectors.fontSelectors));

        constructor() {
                this.initRangeSlider("#range-slider_size-scale", this.sizeScale);
                this.initRangeSlider("#range-slider_line-height", this.lineHeight);
                this.initRangeSlider("#range-slider_letter-spacing", this.letterSpacing);
                this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label");
                this.setupEvents();
        }

        //HELPER
        initRangeSlider(selector: string, value: number) {
                const $slider = $(selector);
                $slider.attr('value', value);
                $slider.next('.range-slider__value').html(value.toString());
        }

        private setupEvents() {
                $("#dropdown-font-family .dropdown-item").each((index, element) => {
                        $(element).on("click", (event) => {
                                const fontName = $(element).text();
                                this.$dropdownLabelFontFamily.text(fontName);
                                this.loadFontByWebFontLoader(fontName);
                        })
                })

                $("#font-panel ,range-slider input").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'range-slider_line-height':
                                        this.lineHeight = parseFloat(newValue);
                                        this.updateLineHeight();
                                        break;
                                case 'range-slider_letter-spacing':
                                        this.lineHeight = parseFloat(newValue);
                                        this.updateLetterSpacing();
                                        break;
                                case 'range-slider_size-scale':
                                        // restore to original size before scaling , meanwhile disable slider
                                        this.updateSizeScale(1 / this.sizeScale);
                                        $("input#range-slider_size-scale ").prop('disabled', true);
                                        this.sizeScale = parseFloat(newValue);
                                        // add a delay to ensure finish restoring first
                                        setTimeout(() => {
                                                this.updateSizeScale(this.sizeScale);
                                                $("input#range-slider_size-scale ").prop('disabled', false);
                                        }, 300)
                                        break;
                        }
                });
        }

        updateSizeScale(scale: number) {
                // 1: selectors for scaling can not be overlap, for e.g. if <span> text inside <p>, it will be scaled twice!
                //2: use relative units like rem
                // TOFIX: missing elements when try caching this JQuery<HTMLElement>
                $('h1,h2,h3,h4,h5,h6, p, .button, button, .title-wrapper, table th, table tbody, .badge-pill, label, .checkbox .name, .button i, input, textarea, small').each((index, element) => {
                        const $text = $(element);
                        const currentSizeText = $text.css('font-size');
                        const currentSize = parseFloat(currentSizeText.replace('px', ''))
                        //TOFIX: this method leaves dirty rule traces
                        $text.attr('style', function (i, s) { return (s || '') + `font-size: ${currentSize * scale}px !important;` });
                        // $text.css('font-size', `${currentSize * scale}px`);
                })
        }

        updateLetterSpacing() {
                this.getFontRule().style.setProperty('letter-spacing', `${this.lineHeight / 100}rem`, 'important');
        }

        private updateLineHeight() {
                this.getFontRule().style.setProperty('line-height', this.lineHeight.toString());
        }

        private loadFontByWebFontLoader(fontFamily: string) {
                // @ts-ignore
                WebFont.load({
                        google: {
                                families: [fontFamily],
                        },
                        timeout: 2000,
                        active: () => {
                                this.applyFontFamily(fontFamily);
                        },
                        inactive: () => {
                        }
                });
        }

        private applyFontFamily(fontFamily: string) {
                this.getFontRule().style.setProperty('font-family', fontFamily, 'important');
        }

        private loadFontByFontFace() {
                var junction_font = new FontFace('Palette Mosaic', 'url(https://fonts.googleapis.com/css2?family=Palette+Mosaic)', { style: 'bold', weight: '700' });
                junction_font.load().then(function (loaded_face) {
                        console.log(' font loaded');
                        $('h2').css('font-family', 'Palette Mosaic, cursive');
                        document.fonts.add(loaded_face);
                        document.body.style.fontFamily = '"Junction Regular", Arial';
                }).catch(function (error) {
                        // error occurred
                        // $('h2').css('font-family', 'Palette Mosaic, cursive');
                        document.fonts.add(junction_font);
                        document.body.style.fontFamily = '"Palette Mosaic", cursive';
                        console.log(' failed');
                });
        }
}


