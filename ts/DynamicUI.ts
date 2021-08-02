import { fallbackSettingFilePath, settingFilePath } from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';

export class DynamicUI {
        dynamicColor?: DynamicColor;
        dynamicFont?: DynamicFont;
        dynamicBackground?: DynamicBackground;
        static currentStyle?: Style;

        // TODO: cache all jQuery selectors
        $body?: JQuery<HTMLElement>; //outer background

        borderRadius: number = 9;

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
                if (DynamicUI.currentStyle) this.dynamicBackground?.removeStylePreferredBgs(DynamicUI.currentStyle);

                DynamicUI.currentStyle = newStyle;
                this.$body!.addClass(DynamicUI.currentStyle.name);
                this.dynamicBackground?.addStylePreferredBgs(DynamicUI.currentStyle);

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
                this.dynamicFont = new DynamicFont();
                this.dynamicBackground = new DynamicBackground();

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
