import * as Ref from "../references.js";
import * as Loader from "../loader.js";
import { Style } from '../base/Style.js'
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
import { DragDropExt } from '../extensions/DragDropExt.js';
import { StyleRegistry } from '../StyleRegistry.js';
import { root } from "../global.js";

export class DynamicUI {
        dynamicColor?: DynamicColor;
        dynamicFont?: DynamicFont;
        dynamicBackground?: DynamicBackground;
        static currentStyle?: Style;

        // TODO: cache all jQuery selectors
        static $body?: JQuery<HTMLElement>; //outer background

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

                this.setupSettingPanel();

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

        private setupSettingPanel() {
                $('.theme-skin.radio-button-group .button').on('click', event => {
                        $('.theme-skin.radio-button-group .button').removeClass('active');
                        $(event.currentTarget).addClass('active')
                });

                this.setupRangeSliders();
        }

        /* DYNAMIC BORDER */
        private setupRangeSliders() {
                const $borderRadiusSlider = $('#border-radius');
                const initialBorderRadius = 9;

                $borderRadiusSlider.attr('value', initialBorderRadius);
                $borderRadiusSlider.next('.range-slider__value').html(initialBorderRadius.toString());
                $borderRadiusSlider.on('input', (event) => {
                        const newValue = (event.target as HTMLInputElement).value;
                        $("#" + event.target.id).next('.range-slider__value').text(newValue);
                        root.style.setProperty('--dui-border-radius', newValue + 'px');
                });
        }
}

// CONSIDER: where to put this
new DynamicUI();
