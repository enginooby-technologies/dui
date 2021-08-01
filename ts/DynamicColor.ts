import { Color } from './base/Color.js';
import { TinyColor } from './base/TinyColor.js';
import { StyleName } from './Config.js';
import { DynamicUI } from './DynamicUI.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'

const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export class DynamicColor {

        static colorfull1: Color = new TinyColor("#01724b");
        static colorfull2: Color = new TinyColor("#bc5b00");
        static colorfull3: Color = new TinyColor("#c40639");

        static schemeColor: Color = new TinyColor("#D4D4D4");
        static highlightColor: Color = new TinyColor("#004b97");
        static baseColor: string = 'black';

        static mutedBaseColor: string = darkMutedBaseColor;

        bgHighlightRule?: CSSStyleRule;
        bgSchemeRule?: CSSStyleRule;
        bgBaseRule?: CSSStyleRule;
        colorHighlightRule?: CSSStyleRule;
        colorBaseRule?: CSSStyleRule;
        colorMutedBaseRule?: CSSStyleRule;
        colorColorfull1Rule?: CSSStyleRule;
        colorColorfull2Rule?: CSSStyleRule;
        colorColorfull3Rule?: CSSStyleRule;

        // TODO: remove these and just compare colors between DynamicUI and currentStyle
        //populate all style names since we have init css files
        stylesWithUpdatedSchemeColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        stylesWithUpdatedHighlightColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        stylesWithUpdatedBaseColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];

        public getBgHighlightRule(): CSSStyleRule {
                return this.bgHighlightRule ?? (this.bgHighlightRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
        }
        public getBgSchemeRule(): CSSStyleRule {
                return this.bgSchemeRule ?? (this.bgSchemeRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
        }
        public getBgBaseRule(): CSSStyleRule {
                return this.bgBaseRule ?? (this.bgBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.bgBaseSelectors));
        }
        public getColorHighlightRule(): CSSStyleRule {
                return this.colorHighlightRule ?? (this.colorHighlightRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
        }
        public getColorBaseRule(): CSSStyleRule {
                return this.colorBaseRule ?? (this.colorBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorBaseSelectors));
        }
        public getColorMutedBaseRule(): CSSStyleRule {
                return this.colorMutedBaseRule ?? (this.colorMutedBaseRule = DynamicUI.insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
        }

        public getColorfull1Rule(): CSSStyleRule {
                return this.colorColorfull1Rule ?? (this.colorColorfull1Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
        }
        public getColorfull2Rule(): CSSStyleRule {
                return this.colorColorfull2Rule ?? (this.colorColorfull2Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
        }
        public getColorfull3Rule(): CSSStyleRule {
                return this.colorColorfull3Rule ?? (this.colorColorfull3Rule = DynamicUI.insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
        }

        // TODO: handle specific project element
        $squareImg?: JQuery<HTMLElement>;

        constructor() {
                this.$squareImg = $(".hero-image .square img");
                $("#scheme-color-picker").attr('value', DynamicColor.schemeColor.hex);
                $("#highlight-color-picker").attr('value', DynamicColor.highlightColor.hex);
                this.setupColorPickerEvents();
        }

        private setupColorPickerEvents() {
                $("#highlight-color-picker").on('input', (event) => {
                        this.updateHighlightColor((event.target as any).value);
                });
                $("#scheme-color-picker").on('input', (event) => {
                        this.updateSchemeColor((event.target as any).value);
                });
                $("#colorfull1-picker").on('input', (event) => {
                        DynamicColor.colorfull1.setHex((event.target as any).value);
                        this.updateColorfull(1);
                });
                $("#colorfull2-picker").on('input', (event) => {
                        DynamicColor.colorfull2.setHex((event.target as any).value);
                        this.updateColorfull(2);
                });
                $("#colorfull3-picker").on('input', (event) => {
                        DynamicColor.colorfull3.setHex((event.target as any).value);
                        this.updateColorfull(3);
                });
        }

        public updateChangesFromLastStyle() {
                if (!this.stylesWithUpdatedSchemeColor.includes(DynamicUI.currentStyle!.name)) {
                        DynamicUI.currentStyle!.onSchemeColorUpdated();
                        this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle!.name);
                }
                if (!this.stylesWithUpdatedHighlightColor.includes(DynamicUI.currentStyle!.name)) {
                        DynamicUI.currentStyle!.onHighlightColorUpdated();
                        this.stylesWithUpdatedHighlightColor.push(DynamicUI.currentStyle!.name);
                }
                if (!this.stylesWithUpdatedBaseColor.includes(DynamicUI.currentStyle!.name)) {
                        DynamicUI.currentStyle!.onBaseColorUpdated();
                        this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle!.name);
                }
        }

        private updateColorfull(colorfullNumber: number) {
                let colorfull: Color;
                let timelineSelector: string;
                if (colorfullNumber == 1) {
                        colorfull = DynamicColor.colorfull1;
                        timelineSelector = '#education-timeline';
                        this.getColorfull1Rule().style.setProperty('color', DynamicColor.colorfull1.hex, 'important');
                }
                if (colorfullNumber == 2) {
                        colorfull = DynamicColor.colorfull2;
                        timelineSelector = '#experience-timeline';
                        this.getColorfull2Rule().style.setProperty('color', DynamicColor.colorfull2.hex, 'important');
                }
                if (colorfullNumber == 3) {
                        colorfull = DynamicColor.colorfull3;
                        timelineSelector = '#achievements-timeline';
                        this.getColorfull3Rule().style.setProperty('color', DynamicColor.colorfull3.hex, 'important');
                }

                $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull!.hex);
                $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull!.hex);
                $(`.background-colorfull${colorfullNumber}`).css('color', colorfull!.getInvertBlackWhite());
                $(`${timelineSelector!} .timeline-item`).css('border-left-color', colorfull!.hex);
                $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull!.getInvertBlackWhite());
        };


        private updateHighlightColor(hex: string) {
                DynamicColor.highlightColor.setHex(hex);
                this.getBgHighlightRule().style.setProperty('background-color', DynamicColor.highlightColor.hex, 'important');
                this.getColorHighlightRule().style.setProperty('color', DynamicColor.highlightColor.hex, 'important');

                DynamicUI.currentStyle!.onHighlightColorUpdated();
                this.stylesWithUpdatedHighlightColor.length = 0;
                this.stylesWithUpdatedHighlightColor.push(DynamicUI.currentStyle!.name);
        }

        private updateSchemeColor(hex: string) {
                DynamicColor.schemeColor.setHex(hex);
                this.updateBaseColor();
                this.getBgSchemeRule().style.setProperty('background-color', DynamicColor.schemeColor.hex, 'important');

                DynamicUI.currentStyle!.onSchemeColorUpdated();
                this.stylesWithUpdatedSchemeColor.length = 0;
                this.stylesWithUpdatedSchemeColor.push(DynamicUI.currentStyle!.name);
        }

        private updateBaseColor() {
                const lastBaseColor = DynamicColor.baseColor;
                DynamicColor.baseColor = DynamicColor.schemeColor.getInvertBlackWhite();
                if (lastBaseColor != DynamicColor.baseColor) this.onBaseColorChanged();
        }

        private onBaseColorChanged() {
                DynamicColor.mutedBaseColor = (DynamicColor.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
                const heroImg = (DynamicColor.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
                this.$squareImg!.attr('src', `assets/img/${heroImg}.png`);
                this.getColorBaseRule().style.setProperty('color', DynamicColor.baseColor, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicColor.mutedBaseColor, 'important');
                this.getBgBaseRule().style.setProperty('background-color', DynamicColor.baseColor, 'important');
                // specific elements affected by base color
                $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${DynamicColor.baseColor}`);
                $('.code-block pre code').css('text-shadow', `0 .5px  ${DynamicColor.schemeColor.getInvert()}`);
                $('.setting-section .setting-panel .background-item').css('border', `${DynamicColor.mutedBaseColor} 2px solid`)
                DynamicUI.currentStyle!.onBaseColorUpdated();
                this.stylesWithUpdatedBaseColor.length = 0;
                this.stylesWithUpdatedBaseColor.push(DynamicUI.currentStyle!.name);
        }
}