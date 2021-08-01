import { fallbackSettingFilePath, settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { Color } from './base/Color.js';
import { TinyColor } from './base/TinyColor.js';

const lightMutedBaseColor: string = "#b2b2b2";
const darkMutedBaseColor: string = "#4D4D4D";

export class DynamicUI {
        static colorfull1: Color = new TinyColor("#01724b");
        static colorfull2: Color = new TinyColor("#bc5b00");
        static colorfull3: Color = new TinyColor("#c40639");

        static schemeColor: Color = new TinyColor("#D4D4D4");
        static highlightColor: Color = new TinyColor("#004b97");
        static baseColor: string = 'black';

        static mutedBaseColor: string = darkMutedBaseColor;

        $squareImg?: JQuery<HTMLElement>;
        // TODO: cache all jQuery selectors
        $body?: JQuery<HTMLElement>; //outer background
        // TODO: find a way to cache $(innerBgSelector)
        innerBgSelector: string = ".display-content>.container"; // inner background, default is the scheme color
        currentOuterBg?: string;
        currentInnerBg?: string;
        hasCustomBg?: boolean; // if the main project using this framework has its own bg, use "custom-background" class in <body>
        customBgClassName: string = "custom-background"
        // although we select global bg for all UI styles, at the first time before doing that, 
        // each style can have its separate  preferred bg (e.g. glass-style w/ bg-3, neu-style w/o bg),
        // only when we manually update  bg from setting panel, all styles are triggerd to use global bg instead of its preferred one.
        updateGlobalBgTriggered: boolean = false;

        borderRadius: number = 9;

        currentStyle?: Style;

        // TODO: remove these and just compare colors between DynamicUI and currentStyle
        //populate all style names since we have init css files
        stylesWithUpdatedSchemeColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        stylesWithUpdatedHighlightColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];
        stylesWithUpdatedBaseColor: StyleName[] = [StyleName.Flat, StyleName.Glass, StyleName.Neu];

        styleSheet?: CSSStyleSheet;
        cssRules?: CSSRuleList;

        private createStyleSheet(): CSSStyleSheet {
                var style = document.createElement("style");
                document.head.appendChild(style);
                return style.sheet!;
        }

        private insertEmptyRule(selector: string): CSSStyleRule {
                return this.cssRules![this.styleSheet!.insertRule(`${selector} {}`)] as CSSStyleRule;
        }

        borderRadiusRule?: CSSStyleRule;
        bgHighlightRule?: CSSStyleRule;
        bgSchemeRule?: CSSStyleRule;
        bgBaseRule?: CSSStyleRule;
        colorHighlightRule?: CSSStyleRule;
        colorBaseRule?: CSSStyleRule;
        colorMutedBaseRule?: CSSStyleRule;
        colorColorfull1Rule?: CSSStyleRule;
        colorColorfull2Rule?: CSSStyleRule;
        colorColorfull3Rule?: CSSStyleRule;

        public getBgHighlightRule(): CSSStyleRule {
                return this.bgHighlightRule ?? (this.bgHighlightRule = this.insertEmptyRule(DynamicSelectors.bgHighlightSelectors));
        }
        public getBgSchemeRule(): CSSStyleRule {
                return this.bgSchemeRule ?? (this.bgSchemeRule = this.insertEmptyRule(DynamicSelectors.bgSchemeSelectors));
        }
        public getBgBaseRule(): CSSStyleRule {
                return this.bgBaseRule ?? (this.bgBaseRule = this.insertEmptyRule(DynamicSelectors.bgBaseSelectors));
        }
        public getColorHighlightRule(): CSSStyleRule {
                return this.colorHighlightRule ?? (this.colorHighlightRule = this.insertEmptyRule(DynamicSelectors.colorHighlightSelectors));
        }
        public getColorBaseRule(): CSSStyleRule {
                return this.colorBaseRule ?? (this.colorBaseRule = this.insertEmptyRule(DynamicSelectors.colorBaseSelectors));
        }
        public getColorMutedBaseRule(): CSSStyleRule {
                return this.colorMutedBaseRule ?? (this.colorMutedBaseRule = this.insertEmptyRule(DynamicSelectors.colorMutedBaseSelectors));
        }
        public getBorderRadiusRule(): CSSStyleRule {
                return this.borderRadiusRule ?? (this.borderRadiusRule = this.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
        }
        public getColorfull1Rule(): CSSStyleRule {
                return this.colorColorfull1Rule ?? (this.colorColorfull1Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull1Selectors));
        }
        public getColorfull2Rule(): CSSStyleRule {
                return this.colorColorfull2Rule ?? (this.colorColorfull2Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull2Selectors));
        }
        public getColorfull3Rule(): CSSStyleRule {
                return this.colorColorfull3Rule ?? (this.colorColorfull3Rule = this.insertEmptyRule(DynamicSelectors.colorColorfull3Selectors));
        }

        public changeStyle(newStyle: Style) {
                this.currentStyle?.onDisable();
                this.$body!.removeClass(this.currentStyle?.name);
                if (!this.updateGlobalBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.removeClass(this.currentStyle?.preferredOuterBg);
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(this.currentStyle?.preferredInnerBg!);
                        })
                }

                this.currentStyle = newStyle;
                this.$body!.addClass(this.currentStyle.name);
                if (!this.updateGlobalBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.addClass(this.currentStyle?.preferredOuterBg);
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.add(this.currentStyle?.preferredInnerBg!);
                        })
                        this.currentOuterBg = this.currentStyle?.preferredOuterBg;
                        this.currentInnerBg = this.currentStyle?.preferredInnerBg;
                }

                $(".customizer").hide();
                this.currentStyle.onEnable();
                this.updateChangesFromLastStyle();
        }

        private updateChangesFromLastStyle() {
                if (!this.stylesWithUpdatedSchemeColor.includes(this.currentStyle!.name)) {
                        this.currentStyle!.onSchemeColorUpdated();
                        this.stylesWithUpdatedSchemeColor.push(this.currentStyle!.name);
                }
                if (!this.stylesWithUpdatedHighlightColor.includes(this.currentStyle!.name)) {
                        this.currentStyle!.onHighlightColorUpdated();
                        this.stylesWithUpdatedHighlightColor.push(this.currentStyle!.name);
                }
                if (!this.stylesWithUpdatedBaseColor.includes(this.currentStyle!.name)) {
                        this.currentStyle!.onBaseColorUpdated();
                        this.stylesWithUpdatedBaseColor.push(this.currentStyle!.name);
                }
        }

        constructor() {
                this.loadSettingPanel(settingFilePath)
                        .fail(() => this.loadSettingPanel(fallbackSettingFilePath)
                        );
        }

        private loadSettingPanel(filePath: string) {
                return $.get(filePath, function (data) {
                        $('body').append(data);
                }).done(() => {
                        this.init();
                });
        }

        private init() {
                this.initSettingPanel();
                this.setupSettingEvents();
                this.$squareImg = $(".hero-image .square img");
                this.$body = $('body');
                this.styleSheet = this.createStyleSheet();
                this.cssRules = this.styleSheet.cssRules || this.styleSheet.rules;

                this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
                if (this.hasCustomBg) $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
                if (!this.hasCustomBg) {
                        this.$body.addClass(this.currentStyle?.preferredOuterBg!);
                }
                // TOFIX: not cover all elements if loading them dynamically after page load
                $(this.innerBgSelector).each((index, element) => {
                        element.classList.add(this.currentStyle?.preferredInnerBg!);
                })

                // TODO: Toggle setting panel/button & scrollbar box-shadow according to current background so that does not look weird

                const initStyleName = this.$body!.attr('class')!.match(/\S*-style\b/i)?.toString();
                new StyleRegistry(this, initStyleName);

                $(".status_change .dropdown-item").click(function () {
                        var getStatusText = $(this).text();
                        $(this).closest(".status_dropdown").find(".status__btn").text(getStatusText);
                        var generateStatusClass = `${$(this).attr('data-class')}-status`
                        $(this).closest(".status_dropdown").attr("data-color", `${generateStatusClass}`);
                })
        }

        private initSettingPanel() {
                $("#scheme-color-picker").attr('value', DynamicUI.schemeColor.hex);
                $("#highlight-color-picker").attr('value', DynamicUI.highlightColor.hex);
                $('#border-radius').attr('value', this.borderRadius);
                $("#border-radius").next('.range-slider__value').html(this.borderRadius.toString());
        }

        private setupSettingEvents() {
                $("#setting-section .setting-button-border").on('click', function () {
                        $("#setting-section .setting-panel").toggleClass('show');
                        $(this).toggleClass('active');
                        $('#setting-section .setting-button').toggleClass('active');
                });
                $('.theme-skin.radio-button-group .button').on('click', event => {
                        $('.theme-skin.radio-button-group .button').removeClass('active');
                        $(event.currentTarget).addClass('active')
                });
                this.setupColorPickerEvents();
                this.setupRangeSliderEvents();

                $('#outer-background-panel .background-item').on('click', (event) => {
                        // TODO: ad-hoc solution in case use PagePiling and load section dynamically after page load, 
                        // therefore all elements with innerBgSelector are not set currentInnerBg yet
                        if (!this.updateGlobalBgTriggered) {
                                $(this.innerBgSelector).each((index, element) => {
                                        element.classList.add(this.currentInnerBg!);
                                })
                        }

                        this.updateGlobalBgTriggered = true;
                        const lastOuterBg: string = this.currentOuterBg!;
                        this.currentOuterBg = event.currentTarget.getAttribute('class')!.match(/\S*-bg\b/i)?.toString() ?? 'none-bg';
                        this.$body!.removeClass(lastOuterBg);
                        this.$body!.addClass(this.currentOuterBg);
                });

                $('#inner-background-panel .background-item').on('click', (event) => {
                        this.updateGlobalBgTriggered = true;
                        const lastInnerBg: string = this.currentInnerBg!;
                        this.currentInnerBg = event.currentTarget.id;

                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(lastInnerBg);
                                element.classList.add(this.currentInnerBg!);
                        })
                });
        }

        private setupColorPickerEvents() {
                $("#highlight-color-picker").on('input', (event) => {
                        this.updateHighlightColor((event.target as any).value);
                });
                $("#scheme-color-picker").on('input', (event) => {
                        this.updateSchemeColor((event.target as any).value);
                });
                $("#colorfull1-picker").on('input', (event) => {
                        DynamicUI.colorfull1.setHex((event.target as any).value);
                        this.updateColorfull(1);
                });
                $("#colorfull2-picker").on('input', (event) => {
                        DynamicUI.colorfull2.setHex((event.target as any).value);
                        this.updateColorfull(2);
                });
                $("#colorfull3-picker").on('input', (event) => {
                        DynamicUI.colorfull3.setHex((event.target as any).value);
                        this.updateColorfull(3);
                });
        }

        private setupRangeSliderEvents() {
                $("#border-radius").on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        switch (event.target.id) {
                                case 'border-radius':
                                        this.borderRadius = parseInt(newValue);
                                        break;
                        }
                        this.updateBorder();
                });
        }

        private updateBorder() {
                this.getBorderRadiusRule().style.setProperty('border-radius', `${this.borderRadius}px`);
                $('.background-item').css('border-radius', this.borderRadius * 6); // since its zoom is 1/6
        }

        private updateColorfull(colorfullNumber: number) {
                let colorfull: Color;
                let timelineSelector: string;
                if (colorfullNumber == 1) {
                        colorfull = DynamicUI.colorfull1;
                        timelineSelector = '#education-timeline';
                        this.getColorfull1Rule().style.setProperty('color', DynamicUI.colorfull1.hex, 'important');
                }
                if (colorfullNumber == 2) {
                        colorfull = DynamicUI.colorfull2;
                        timelineSelector = '#experience-timeline';
                        this.getColorfull2Rule().style.setProperty('color', DynamicUI.colorfull2.hex, 'important');
                }
                if (colorfullNumber == 3) {
                        colorfull = DynamicUI.colorfull3;
                        timelineSelector = '#achievements-timeline';
                        this.getColorfull3Rule().style.setProperty('color', DynamicUI.colorfull3.hex, 'important');
                }

                $(`.colorfull${colorfullNumber}, .background-colorfull${colorfullNumber}>.badge`).css('color', colorfull!.hex);
                $(`.background-colorfull${colorfullNumber}`).css('background-color', colorfull!.hex);
                $(`.background-colorfull${colorfullNumber}`).css('color', colorfull!.getInvertBlackWhite());
                $(`${timelineSelector!} .timeline-item`).css('border-left-color', colorfull!.hex);
                $(`.badge-pill.background-colorfull${colorfullNumber} .badge`).css('background', colorfull!.getInvertBlackWhite());
        };

        private updateHighlightColor(hex: string) {
                DynamicUI.highlightColor.setHex(hex);
                this.getBgHighlightRule().style.setProperty('background-color', DynamicUI.highlightColor.hex, 'important');
                this.getColorHighlightRule().style.setProperty('color', DynamicUI.highlightColor.hex, 'important');

                this.currentStyle!.onHighlightColorUpdated();
                this.stylesWithUpdatedHighlightColor.length = 0;
                this.stylesWithUpdatedHighlightColor.push(this.currentStyle!.name);
        }

        private updateSchemeColor(hex: string) {
                DynamicUI.schemeColor.setHex(hex);
                this.updateBaseColor();
                this.getBgSchemeRule().style.setProperty('background-color', DynamicUI.schemeColor.hex, 'important');

                this.currentStyle!.onSchemeColorUpdated();
                this.stylesWithUpdatedSchemeColor.length = 0;
                this.stylesWithUpdatedSchemeColor.push(this.currentStyle!.name);
        }

        private updateBaseColor() {
                const lastBaseColor = DynamicUI.baseColor;
                DynamicUI.baseColor = DynamicUI.schemeColor.getInvertBlackWhite();
                if (lastBaseColor != DynamicUI.baseColor) this.onBaseColorChanged();
        }

        private onBaseColorChanged() {
                DynamicUI.mutedBaseColor = (DynamicUI.baseColor == '#ffffff') ? lightMutedBaseColor : darkMutedBaseColor;
                const heroImg = (DynamicUI.baseColor == '#ffffff') ? "light-element_square" : "dark-element_square";
                this.$squareImg!.attr('src', `assets/img/${heroImg}.png`);
                this.getColorBaseRule().style.setProperty('color', DynamicUI.baseColor, 'important');
                this.getColorMutedBaseRule().style.setProperty('color', DynamicUI.mutedBaseColor, 'important');
                this.getBgBaseRule().style.setProperty('background-color', DynamicUI.baseColor, 'important');
                // specific elements affected by base color
                $('.overlay-menu-toggler lord-icon').attr('colors', `primary:${DynamicUI.baseColor}`);
                $('.code-block pre code').css('text-shadow', `0 .5px  ${DynamicUI.schemeColor.getInvert()}`);
                $('.setting-section .setting-panel .background-item').css('border', `${DynamicUI.mutedBaseColor} 2px solid`)
                this.currentStyle!.onBaseColorUpdated();
                this.stylesWithUpdatedBaseColor.length = 0;
                this.stylesWithUpdatedBaseColor.push(this.currentStyle!.name);
        }
}

// CONSIDER: where to put this
new DynamicUI();
