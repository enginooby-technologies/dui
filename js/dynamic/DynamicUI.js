import * as Ref from "../references.js";
import * as Loader from "../loader.js";
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
import { DragDropExt } from '../extensions/DragDropExt.js';
import { StyleRegistry } from '../StyleRegistry.js';
import { root } from "../global.js";
export class DynamicUI {
    constructor() {
        var _a;
        DynamicUI.$body = $('body');
        this.setupSettingPanel();
        // get init class "...-style" from body
        const initStyleName = (_a = DynamicUI.$body.attr('class').match(/\S*-style\b/i)) === null || _a === void 0 ? void 0 : _a.toString();
        new StyleRegistry(this, initStyleName);
        this.dynamicColor = new DynamicColor();
        this.dynamicBackground = new DynamicBackground();
        this.enableDynamicFont();
        // this.enableDragDropExtension();
    }
    setCurrentStyle(newStyle) {
        var _a, _b, _c, _d, _e;
        (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.onDisable();
        DynamicUI.$body.removeClass((_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.name);
        DynamicUI.currentStyle = newStyle;
        DynamicUI.$body.addClass(DynamicUI.currentStyle.name);
        $(".customizer").hide();
        DynamicUI.currentStyle.onEnable();
        // update dynamic components
        if (DynamicUI.currentStyle.preferredFontFamily) {
            (_c = this.dynamicFont) === null || _c === void 0 ? void 0 : _c.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
        }
        (_d = this.dynamicBackground) === null || _d === void 0 ? void 0 : _d.onStyleUpdate();
        (_e = this.dynamicColor) === null || _e === void 0 ? void 0 : _e.updateChangesFromLastStyle();
    }
    enableDynamicFont() {
        Loader.tryLoadScript(Ref.webfontJs, () => {
            var _a, _b;
            this.dynamicFont = new DynamicFont();
            if ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredFontFamily) {
                (_b = this.dynamicFont) === null || _b === void 0 ? void 0 : _b.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
            }
        });
    }
    enableDragDropExtension() {
        Loader.tryLoadScript(Ref.interactMinJs, () => {
            new DragDropExt();
        });
    }
    setupSettingPanel() {
        $('.theme-skin.radio-button-group .button').on('click', event => {
            $('.theme-skin.radio-button-group .button').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        this.setupRangeSliders();
    }
    /* DYNAMIC BORDER */
    setupRangeSliders() {
        const $borderRadiusSlider = $('#border-radius');
        const initialBorderRadius = 9;
        $borderRadiusSlider.attr('value', initialBorderRadius);
        $borderRadiusSlider.next('.range-slider__value').html(initialBorderRadius.toString());
        $borderRadiusSlider.on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            root.style.setProperty('--border-radius', newValue + 'px');
        });
    }
}
// CONSIDER: where to put this
new DynamicUI();
