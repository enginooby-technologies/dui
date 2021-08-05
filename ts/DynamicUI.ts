import * as Config from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js'
import { Style } from './base/Style.js'
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
import { DragDropExt } from './extensions/DragDropExt.js';

export class DynamicUI {
        dynamicColor?: DynamicColor;
        dynamicFont?: DynamicFont;
        dynamicBackground?: DynamicBackground;
        static currentStyle?: Style;

        // TODO: cache all jQuery selectors
        static $body?: JQuery<HTMLElement>; //outer background

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

        borderRadius: number = 9;
        borderRadiusRule?: CSSStyleRule;
        public getBorderRadiusRule(): CSSStyleRule {
                return this.borderRadiusRule ?? (this.borderRadiusRule = DynamicUI.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
        }

        public setCurrentStyle(newStyle: Style) {
                DynamicUI.currentStyle?.onDisable();
                DynamicUI.$body!.removeClass(DynamicUI.currentStyle?.name);

                DynamicUI.currentStyle = newStyle;
                DynamicUI.$body!.addClass(DynamicUI.currentStyle.name);
                $(".customizer").hide();
                DynamicUI.currentStyle.onEnable();

                // update dynamic components
                if (DynamicUI.currentStyle.preferredFontFamily) {
                        this.dynamicFont?.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
                }
                this.dynamicBackground?.onStyleUpdate();
                this.dynamicColor?.updateChangesFromLastStyle();
        }

        constructor() {
                this.loadSettingPanel(Config.settingFilePath)
                        .fail(() => this.loadSettingPanel(Config.fallbackSettingFilePath)
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
                DynamicUI.$body = $('body');
                DynamicUI.styleSheet = DynamicUI.createStyleSheet();
                DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;

                this.initSettingPanel();
                this.setupSettingEvents();

                const initStyleName = DynamicUI.$body!.attr('class')!.match(/\S*-style\b/i)?.toString();
                new StyleRegistry(this, initStyleName);

                this.dynamicColor = new DynamicColor();
                this.dynamicBackground = new DynamicBackground();
                this.enableDynamicFont();
                // this.enableDragDropExtension();
        }

        private enableDynamicFont() {
                this.loadScriptDependency(Config.webfontJs.src, () => {
                        this.dynamicFont = new DynamicFont();
                        if (DynamicUI.currentStyle?.preferredFontFamily) {
                                this.dynamicFont?.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
                        }
                });
        }

        private enableDragDropExtension() {
                this.loadScriptDependency(Config.interactJs.src, () => {
                        new DragDropExt();
                });
        }

        private loadScriptDependency(src: string, onload: () => void, integrity?: string, crossOrigin?: string, referrerPolicy?: string) {
                const script: HTMLScriptElement = document.createElement('script');
                script.onload = onload;
                script.async = true;
                script.src = src;
                if (integrity) script.integrity = integrity;
                if (crossOrigin) script.crossOrigin = crossOrigin;
                if (referrerPolicy) script.referrerPolicy = referrerPolicy;
                document.head.appendChild(script);
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
