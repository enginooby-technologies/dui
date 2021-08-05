import * as Config from './Config.js';
import * as DynamicSelectors from './selectors/DynamicSelectors.js';
import { StyleRegistry } from './StyleRegistry.js';
import { DynamicColor } from './DynamicColor.js';
import { DynamicBackground } from './DynamicBackground.js';
import { DynamicFont } from './DynamicFont.js';
import { DragDropExt } from './extensions/DragDropExt.js';
export class DynamicUI {
    constructor() {
        this.borderRadius = 9;
        this.init();
        // this.loadSettingPanel(Config.settingFilePath)
        //         .fail(() => this.loadSettingPanel(Config.fallbackSettingFilePath)
        //         );
    }
    static createStyleSheet() {
        var style = document.createElement("style");
        document.head.appendChild(style);
        return style.sheet;
    }
    static insertEmptyRule(selector) {
        return DynamicUI.cssRules[DynamicUI.styleSheet.insertRule(`${selector} {}`)];
    }
    getBorderRadiusRule() {
        var _a;
        return (_a = this.borderRadiusRule) !== null && _a !== void 0 ? _a : (this.borderRadiusRule = DynamicUI.insertEmptyRule(DynamicSelectors.borderRadiusSelectors));
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
    loadSettingPanel(filePath) {
        return $.get(filePath, function (data) {
            $('body').append(data);
        }).done(() => {
            this.init();
        });
    }
    init() {
        var _a;
        DynamicUI.$body = $('body');
        DynamicUI.styleSheet = DynamicUI.createStyleSheet();
        DynamicUI.cssRules = DynamicUI.styleSheet.cssRules || DynamicUI.styleSheet.rules;
        this.initSettingPanel();
        this.setupSettingEvents();
        const initStyleName = (_a = DynamicUI.$body.attr('class').match(/\S*-style\b/i)) === null || _a === void 0 ? void 0 : _a.toString();
        new StyleRegistry(this, initStyleName);
        this.dynamicColor = new DynamicColor();
        this.dynamicBackground = new DynamicBackground();
        this.enableDynamicFont();
        // this.enableDragDropExtension();
    }
    enableDynamicFont() {
        this.loadScriptDependency(Config.webfontJs.src, () => {
            var _a, _b;
            this.dynamicFont = new DynamicFont();
            if ((_a = DynamicUI.currentStyle) === null || _a === void 0 ? void 0 : _a.preferredFontFamily) {
                (_b = this.dynamicFont) === null || _b === void 0 ? void 0 : _b.loadThenApplyFontFamily(DynamicUI.currentStyle.preferredFontFamily);
            }
        });
    }
    enableDragDropExtension() {
        this.loadScriptDependency(Config.interactJs.src, () => {
            new DragDropExt();
        });
    }
    loadScriptDependency(src, onload, integrity, crossOrigin, referrerPolicy) {
        const script = document.createElement('script');
        script.onload = onload;
        script.async = true;
        script.src = src;
        if (integrity)
            script.integrity = integrity;
        if (crossOrigin)
            script.crossOrigin = crossOrigin;
        if (referrerPolicy)
            script.referrerPolicy = referrerPolicy;
        document.head.appendChild(script);
    }
    initSettingPanel() {
        $('#border-radius').attr('value', this.borderRadius);
        $("#border-radius").next('.range-slider__value').html(this.borderRadius.toString());
    }
    setupSettingEvents() {
        // $(" .setting-button-border").on('click', function () {
        //         $("#setting-section .setting-panel").toggleClass('show');
        //         $(this).toggleClass('active');
        //         $('#setting-section .setting-button').toggleClass('active');
        // });
        $('.theme-skin.radio-button-group .button').on('click', event => {
            $('.theme-skin.radio-button-group .button').removeClass('active');
            $(event.currentTarget).addClass('active');
        });
        this.setupRangeSliderEvents();
    }
    setupRangeSliderEvents() {
        $("#border-radius").on('input', (event) => {
            const newValue = event.target.value;
            $("#" + event.target.id).next('.range-slider__value').text(newValue);
            switch (event.target.id) {
                case 'border-radius':
                    this.borderRadius = parseInt(newValue);
                    break;
            }
            this.updateBorder();
        });
    }
    updateBorder() {
        this.getBorderRadiusRule().style.setProperty('border-radius', `${this.borderRadius}px`);
        $('.background-item').css('border-radius', this.borderRadius * 6); // since its zoom is 1/6
    }
}
// CONSIDER: where to put this
new DynamicUI();
