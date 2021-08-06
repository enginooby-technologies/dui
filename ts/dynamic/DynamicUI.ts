import * as DynamicSelectors from '../selectors/DynamicSelectors.js'
import * as Ref from "../references.js";
import * as Loader from "../loader.js";
import { Style } from '../base/Style.js'
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
import { DragDropExt } from '../extensions/DragDropExt.js';
import { StyleRegistry } from '../StyleRegistry.js';

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
                DynamicUI.$body = $('body');
                DynamicUI.styleSheet = DynamicUI.createStyleSheet();
                DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;

                this.initSettingPanel();
                this.setupSettingEvents();

                // get init class "...-style" from body
                const initStyleName = DynamicUI.$body!.attr('class')!.match(/\S*-style\b/i)?.toString();
                new StyleRegistry(this, initStyleName);

                this.dynamicColor = new DynamicColor();
                this.dynamicBackground = new DynamicBackground();
                this.enableDynamicFont();
                // this.enableDragDropExtension();
        }

        private enableDynamicFont() {
                Loader.tryLoadScript(Ref.webfontJs, () => {
                        this.dynamicFont = new DynamicFont();
                        if (DynamicUI.currentStyle?.preferredFontFamily) {
                                this.dynamicFont?.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
                        }
                })
        }

        private enableDragDropExtension() {
                Loader.tryLoadScript(Ref.interactMinJs, () => {
                        new DragDropExt();
                })
        }

        private initSettingPanel() {
                $('#border-radius').attr('value', this.borderRadius);
                $("#border-radius").next('.range-slider__value').html(this.borderRadius.toString());
        }

        private setupSettingEvents() {
                $('.theme-skin.radio-button-group .button').on('click', event => {
                        $('.theme-skin.radio-button-group .button').removeClass('active');
                        $(event.currentTarget).addClass('active')
                });

                this.setupRangeSliderEvents();
        }

        /* DYNAMIC BORDER */
        borderRadius: number = 9;
        borderRadiusRule?: CSSStyleRule;
        public getBorderRadiusRule(): CSSStyleRule {
                return this.borderRadiusRule ?? (this.borderRadiusRule = DynamicUI.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
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
