import { DragDropExt } from '../extensions/DragDropExt.js';
import { root } from "../global.js";
import * as Loader from "../loader.js";
import * as Ref from "../references.js";
import { StyleRegistry } from '../StyleRegistry.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicFont } from './DynamicFont.js';
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
        var _a, _b, _c, _d;
        (_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.onDisable();
        DynamicUI.$body.removeClass((_b = DynamicUI.currentStyle) === null || _b === void 0 ? void 0 : _b.name);
        DynamicUI.currentStyle = newStyle;
        DynamicUI.$body.addClass(DynamicUI.currentStyle.name);
        $(".customizer").hide();
        DynamicUI.currentStyle.onEnable();
        // update dynamic components
        if (DynamicUI.currentStyle.fontFamily) {
            (_c = this.dynamicFont) === null || _c === void 0 ? void 0 : _c.loadThenApplyFontFamily(DynamicUI.currentStyle.fontFamily);
        }
        // this.$borderRadiusSlider!.attr('value', DynamicUI.currentStyle.borderRadius!.toString());
        this.setBorderRadius(DynamicUI.currentStyle.borderRadius.toString());
        (_d = this.dynamicBackground) === null || _d === void 0 ? void 0 : _d.onStyleUpdate();
        // this.dynamicColor?.updateChangesFromLastStyle();
    }
    enableDynamicFont() {
        Loader.tryLoadScript(Ref.webfontJs, () => {
            var _a, _b;
            this.dynamicFont = new DynamicFont();
            if ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.fontFamily) {
                (_b = this.dynamicFont) === null || _b === void 0 ? void 0 : _b.loadThenApplyFontFamily(DynamicUI.currentStyle.fontFamily);
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
        this.$borderRadiusSlider = $('#border-radius');
        this.$borderValueLabel = this.$borderRadiusSlider.next('.range-slider__value');
        const initialBorderRadius = 9;
        // this.$borderRadiusSlider.attr('value', initialBorderRadius);
        this.$borderValueLabel.html(initialBorderRadius.toString());
        this.$borderRadiusSlider.on('input', (event) => {
            const newValue = event.target.value;
            this.setBorderRadius(newValue);
        });
    }
    setBorderRadius(value) {
        this.$borderValueLabel.text(value);
        this.$borderRadiusSlider.attr('value', value);
        root.style.setProperty('--dui-border-radius', value + 'px');
    }
}
// CONSIDER: where to put this
new DynamicUI();
