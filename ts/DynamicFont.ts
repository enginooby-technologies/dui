// import WebFont from "webfontloader";
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { DynamicUI } from "./DynamicUI.js";

export class DynamicFont {
        currentFamily?: string;
        currentScale?: number;
        $dropdownLabelFontFamily: JQuery<HTMLElement>;
        fontRule?: CSSStyleRule;

        getFontRule = () => this.fontRule ?? (this.fontRule = DynamicUI.insertEmptyRule(DynamicSelectors.fontSelectors));

        constructor() {
                this.$dropdownLabelFontFamily = $("#dropdown-font-family .dropdown-label");
                this.setupEvent();
        }

        private setupEvent() {
                $("#dropdown-font-family .dropdown-item").each((index, element) => {
                        $(element).on("click", (event) => {
                                const fontName = $(element).text();
                                this.$dropdownLabelFontFamily.text(fontName);
                                this.loadFontByWebFontLoader(fontName);
                        })
                })
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


