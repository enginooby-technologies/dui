import { fallbackSettingFilePath, settingFilePath, StyleName } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';

export class DynamicUI {
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

        dynamicColor?: DynamicColor;
        static currentStyle?: Style;

        static styleSheet?: CSSStyleSheet;
        static cssRules?: CSSRuleList;
        static createStyleSheet(): CSSStyleSheet {
                var style = document.createElement("style");
                document.head.appendChild(style);
                return style.sheet!;
        }
        static insertEmptyRule(selector: string): CSSStyleRule {
                return DynamicUI.cssRules![DynamicUI.styleSheet!.insertRule(`${selector} {}`)] as CSSStyleRule;
        }

        borderRadiusRule?: CSSStyleRule;
        public getBorderRadiusRule(): CSSStyleRule {
                return this.borderRadiusRule ?? (this.borderRadiusRule = DynamicUI.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
        }

        public changeStyle(newStyle: Style) {
                DynamicUI.currentStyle?.onDisable();
                this.$body!.removeClass(DynamicUI.currentStyle?.name);
                if (!this.updateGlobalBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.removeClass(DynamicUI.currentStyle?.preferredOuterBg);
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.remove(DynamicUI.currentStyle?.preferredInnerBg!);
                        })
                }

                DynamicUI.currentStyle = newStyle;
                this.$body!.addClass(DynamicUI.currentStyle.name);
                if (!this.updateGlobalBgTriggered) {
                        if (!this.hasCustomBg) this.$body!.addClass(DynamicUI.currentStyle?.preferredOuterBg);
                        $(this.innerBgSelector).each((index, element) => {
                                element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
                        })
                        this.currentOuterBg = DynamicUI.currentStyle?.preferredOuterBg;
                        this.currentInnerBg = DynamicUI.currentStyle?.preferredInnerBg;
                }

                $(".customizer").hide();
                DynamicUI.currentStyle.onEnable();
                this.dynamicColor?.updateChangesFromLastStyle();
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
                DynamicUI.styleSheet = DynamicUI.createStyleSheet();
                DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;
                this.initSettingPanel();
                this.setupSettingEvents();
                this.$body = $('body');
                this.dynamicColor = new DynamicColor();

                this.hasCustomBg = this.$body.hasClass(this.customBgClassName);
                if (this.hasCustomBg) $(`.setting-panel .${this.customBgClassName}`).removeClass('hide');
                if (!this.hasCustomBg) {
                        this.$body.addClass(DynamicUI.currentStyle?.preferredOuterBg!);
                }
                // TOFIX: not cover all elements if loading them dynamically after page load
                $(this.innerBgSelector).each((index, element) => {
                        element.classList.add(DynamicUI.currentStyle?.preferredInnerBg!);
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

}

// CONSIDER: where to put this
new DynamicUI();
